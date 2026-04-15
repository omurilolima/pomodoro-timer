interface IAppState {
  time: number;
  isPaused: boolean;
  isRunning: boolean;
  step: 1 | 2 | 3 | 4;
  counterCicleTime: number;
  currentFocusCicleTime: number;
  currentLongBreakCicleTime: number;
  currentShortBreakCicleTime: number;
  currentStatus: "focus" | "shortBreak" | "longBreak";
}

export const updateStateByElapsedTime = (appState: IAppState): IAppState => {
  if (!appState.isRunning || appState.isPaused) return appState;

  const now = Date.now();
  const elapsedSeconds = Math.floor((now - (appState.time ?? now)) / 1000);
  if (elapsedSeconds <= 0) return appState;

  let timeLeft = appState.counterCicleTime - elapsedSeconds;
  let currentStatus = appState.currentStatus;
  let step = appState.step;

  while (timeLeft <= 0) {
    const debt = -timeLeft;

    if (currentStatus === "focus") {
      if (step < 4) {
        step = (step + 1) as 1 | 2 | 3 | 4;
        currentStatus = "shortBreak";
        timeLeft = appState.currentShortBreakCicleTime - debt;
      } else {
        step = 1;
        currentStatus = "longBreak";
        timeLeft = appState.currentLongBreakCicleTime - debt;
      }
    } else {
      currentStatus = "focus";
      timeLeft = appState.currentFocusCicleTime - debt;
    }
  }

  return {
    ...appState,
    step,
    time: now,
    currentStatus,
    counterCicleTime: timeLeft,
  };
};
