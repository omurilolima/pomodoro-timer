import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { TNavigationScreenProps } from "../appRoutes";
import { Theme } from "../shared/themes/Theme";
import { StyleSheet } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { MaterialIcons } from "@expo/vector-icons";
import { use, useEffect, useMemo, useState } from "react";

export const Home = () => {
  const navigation = useNavigation<TNavigationScreenProps>();

  const [currentStatus, setCurrentStatus] = useState<
    "focus" | "shortBreak" | "longBreak"
  >("focus");

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const [currentFocusCicleTime] = useState(25 * 60);
  const [currentShortBreakCicleTime] = useState(5 * 60);
  const [currentLongBreakCicleTime] = useState(15 * 60);
  const [counterCicleTime, setCounterCicleTime] = useState(25 * 60);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    setCounterCicleTime(currentFocusCicleTime);
    setStep(1);
  };

  const handleContinue = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  useEffect(() => {
    if (!isRunning || isPaused) return;

    const ref = setInterval(() => {
      setCounterCicleTime((old) => (old <= 0 ? old : old - 1));
    }, 1000);

    return () => clearInterval(ref);
  }, [isRunning, isPaused]);

  useEffect(() => {
    switch (currentStatus) {
      case "focus": {
        if (counterCicleTime > 0) break;
        if (step < 4) {
          setStep((old) => (old < 4 ? ((old + 1) as 1 | 2 | 3 | 4) : old));
          setCurrentStatus("shortBreak");
          setCounterCicleTime(currentShortBreakCicleTime);
        } else {
          setStep(1);
          setCurrentStatus("longBreak");
          setCounterCicleTime(currentLongBreakCicleTime);
        }
        break;
      }
      case "shortBreak":
      case "longBreak": {
        if (counterCicleTime <= 0) {
          setCurrentStatus("focus");
          setCounterCicleTime(currentFocusCicleTime);
        }
        break;
      }
    }
  }, [
    currentStatus,
    counterCicleTime,
    step,
    currentShortBreakCicleTime,
    currentFocusCicleTime,
    currentLongBreakCicleTime,
  ]);

  const timeProgress = useMemo(() => {
    switch (currentStatus) {
      case "focus":
        return 100 - (counterCicleTime / currentFocusCicleTime) * 100;
      case "shortBreak":
        return 100 - (counterCicleTime / currentShortBreakCicleTime) * 100;
      case "longBreak":
        return 100 - (counterCicleTime / currentLongBreakCicleTime) * 100;
    }
  }, [
    currentStatus,
    counterCicleTime,
    currentFocusCicleTime,
    currentShortBreakCicleTime,
    currentLongBreakCicleTime,
  ]);

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate("Settings")}
      >
        <MaterialIcons name="settings" size={28} color={Theme.colors.divider} />
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.titleGroup}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Pomodoro</Text>
          </View>

          <View style={styles.stateContainer}>
            {!isRunning && (
              <Text style={styles.stateText}>Vamos nos concentrar?</Text>
            )}

            {isRunning && (
              <>
                {!isPaused && currentStatus === "focus" && (
                  <Text style={styles.stateText}>Hora de se concentrar!</Text>
                )}

                {!isPaused && currentStatus === "shortBreak" && (
                  <Text style={styles.stateText}>Pausa curta</Text>
                )}

                {!isPaused && currentStatus === "longBreak" && (
                  <Text style={styles.stateText}>Pausa longa</Text>
                )}

                {isPaused && (
                  <Text style={styles.stateText}>Cronômetro em pausa</Text>
                )}
              </>
            )}
          </View>
          <View style={styles.progressContainer}>
            <AnimatedCircularProgress
              size={160}
              width={7}
              fill={timeProgress}
              tintColor={Theme.colors.divider}
              backgroundColor={Theme.colors.primary}
              rotation={0}
              children={() => (
                <Text style={styles.progressText}>
                  {Math.floor(counterCicleTime / 60)}:
                  {(counterCicleTime % 60).toString().padStart(2, "0")}
                </Text>
              )}
            />
          </View>
        </View>

        {!isRunning && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleStart}
            >
              <Text style={styles.primaryButtonText}>Iniciar</Text>
            </TouchableOpacity>
          </View>
        )}

        {isRunning && !isPaused && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText} onPress={handlePause}>
                Pausar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleStop}
            >
              <Text style={styles.secondaryButtonText}>Parar</Text>
            </TouchableOpacity>
          </View>
        )}

        {isRunning && isPaused && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleContinue}
            >
              <Text style={styles.primaryButtonText}>Continuar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleStop}
            >
              <Text style={styles.secondaryButtonText}>Parar</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.pomodorosContainer}>
          <Text style={styles.pomodorosText}>Pormodoros:</Text>
          <View
            style={
              step >= 2
                ? styles.pomodorosIndicatorComplete
                : styles.pomodorosIndicator
            }
          />
          <View
            style={
              step >= 3
                ? styles.pomodorosIndicatorComplete
                : styles.pomodorosIndicator
            }
          />
          <View
            style={
              step >= 4
                ? styles.pomodorosIndicatorComplete
                : styles.pomodorosIndicator
            }
          />
          <View
            style={
              step === 1 && currentStatus === "longBreak"
                ? styles.pomodorosIndicatorComplete
                : styles.pomodorosIndicator
            }
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    gap: 36,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  settingsButton: {
    alignSelf: "flex-end",
  },
  titleGroup: {
    gap: 24,
  },
  primaryButton: {
    backgroundColor: Theme.colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 55,
  },
  primaryButtonText: {
    color: Theme.colors.text,
    fontSize: Theme.fontSizes.body,
    fontFamily: Theme.fonts.interRegular,
    borderColor: Theme.colors.primary,
    borderWidth: 2,
  },
  secondaryButton: {
    borderColor: Theme.colors.primary,
    borderWidth: 2,
    borderRadius: 55,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  secondaryButtonText: {
    color: Theme.colors.text,
    fontSize: Theme.fontSizes.body,
    fontFamily: Theme.fonts.interRegular,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  progressContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  progressText: {
    color: Theme.colors.text,
    fontSize: Theme.fontSizes.title,
    fontFamily: Theme.fonts.interBold,
  },
  titleContainer: {
    alignItems: "center",
  },
  titleText: {
    color: Theme.colors.text,
    fontSize: Theme.fontSizes.title,
    fontFamily: Theme.fonts.interBold,
  },
  stateContainer: {
    alignItems: "center",
  },
  stateText: {
    color: Theme.colors.text,
    fontSize: Theme.fontSizes.body,
    fontFamily: Theme.fonts.interRegular,
  },
  pomodorosContainer: {
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  pomodorosText: {
    color: Theme.colors.text,
    fontSize: Theme.fontSizes.body,
    fontFamily: Theme.fonts.interRegular,
  },
  pomodorosIndicator: {
    width: 20,
    height: 20,
    borderRadius: "100%",
    backgroundColor: Theme.colors.divider,
  },
  pomodorosIndicatorComplete: {
    width: 20,
    height: 20,
    borderRadius: "100%",
    backgroundColor: Theme.colors.primary,
  },
});
