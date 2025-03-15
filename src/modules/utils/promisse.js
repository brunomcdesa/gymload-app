export const delay = async (ms) => {
  await new Promise((resolve) => setTimeout(() => resolve(), ms));
};

export const pMinDelay = async (promise, ms = 0, opts) => {
  const options = {
    delayRejection: true,
    ...opts,
  };

  let promiseRes;
  let promiseErr;

  const start = new Date();

  try {
    promiseRes = await promise;
  } catch (error) {
    promiseErr = error;
  }

  const end = new Date();
  const elapsedTime = end - start;
  const { delayRejection } = options;

  if (elapsedTime) {
    if (promiseRes || (promiseErr && delayRejection)) {
      await delay(ms - elapsedTime);
    }
  }

  if (promiseErr) {
    throw promiseErr;
  }

  return promiseRes;
};
