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

  let remaining = appState.counterCicleTime;
  let timeLeft = remaining - elapsedSeconds;
  let currentStatus = appState.currentStatus;
  let step = appState.step;

  const advanceCycle = () => {
    if (currentStatus === "focus") {
      if (step < 4) {
        step = (step + 1) as 1 | 2 | 3 | 4;
        currentStatus = "shortBreak";
        return appState.currentShortBreakCicleTime;
      } else {
        step = 1;
        currentStatus = "longBreak";
        return appState.currentLongBreakCicleTime;
      }
    }

    if (currentStatus === "shortBreak" || currentStatus === "longBreak") {
      currentStatus = "focus";
      return appState.currentFocusCicleTime;
    }

    return remaining;
  };

  while (timeLeft <= 0) {
    const overflow = Math.abs(timeLeft);
    const nextTime = advanceCycle();
  }

  return {
    ...appState,
    step,
    time: now,
    currentStatus,
    counterCicleTime: timeLeft,
  };
};
