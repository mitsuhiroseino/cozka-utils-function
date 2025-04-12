/**
 * setIntervalの代わりにrequestAnimationFrameを使用し繰り返し処理を行う関数
 *
 * @param callback
 * @param delay
 * @param args
 * @returns
 */
export default function requestInterval<A extends any[]>(
  callback: (...args: A) => void,
  delay: number,
  ...args: A
) {
  let requestId;
  let last = performance.now();
  function fnc(now) {
    if (now - last >= delay) {
      callback(...args);
      last = now;
    }
    requestId = requestAnimationFrame(fnc);
  }
  requestId = requestAnimationFrame(fnc);

  return () => {
    cancelAnimationFrame(requestId);
  };
}
