// src/tests/setup.ts
import { beforeAll, afterAll } from 'vitest';
import { db, client } from '../db';

// We will use this flag to break out of the transaction cleanly
class RollbackError extends Error {
  constructor() {
    super('Triggering automatic rollback after tests');
    this.name = 'RollbackError';
  }
}

let transactionEnded = false;

beforeAll(async () => {
  // 1. We start a long-running transaction block
  // 2. We deliberately DO NOT await it here, because it needs to stay open
  //    while the tests run in the background.
  db.transaction(async (tx) => {
    // We override the global 'db' object temporarily so that your controller
    // code (which imports 'db') uses this specific transaction connection instead.
    const originalDb = db;
    Object.assign(db, tx);

    // Wait until tests are done...
    await new Promise<void>((resolve) => {
      // This interval keeps checking if the tests have finished
      const checkInterval = setInterval(() => {
        if (transactionEnded) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 50);
    });

    // Restore the original db object
    Object.assign(db, originalDb);

    // Throw our custom error to force Drizzle/Postgres to ROLLBACK the transaction
    throw new RollbackError();
  }).catch((err) => {
    // If the error is our custom RollbackError, swallow it (it's expected)
    if (err.name !== 'RollbackError') {
      console.error('Test transaction failed:', err);
    }
  });
});

afterAll(async () => {
  // Signal to the transaction block that tests are done
  transactionEnded = true;

  // Give the transaction a tiny moment to throw its rollback error
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Close the database connection so Vitest can exit cleanly
  await client.end();
});
