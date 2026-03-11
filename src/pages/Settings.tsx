import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { TNavigationScreenProps } from "../appRoutes";
import { Theme } from "../shared/themes/Theme";
import { StyleSheet } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { MaterialIcons } from "@expo/vector-icons";

export const Settings = () => {
  const navigation = useNavigation<TNavigationScreenProps>();
  const [loaded, setLoaded] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [focusPeriod, setFocusPeriod] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);

  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem("NOTIFICATIONS_ENABLED"),
      AsyncStorage.getItem("FOCUS_PERIOD"),
      AsyncStorage.getItem("SHORT_BREAK"),
      AsyncStorage.getItem("LONG_BREAK"),
    ])
      .then(([notificationsEnabled, focusPeriod, shortBreak, longBreak]) => {
        setNotificationsEnabled(JSON.parse(notificationsEnabled || "true"));
        setFocusPeriod(JSON.parse(focusPeriod || "25"));
        setShortBreak(JSON.parse(shortBreak || "5"));
        setLongBreak(JSON.parse(longBreak || "15"));
      })
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(
      "NOTIFICATIONS_ENABLED",
      JSON.stringify(notificationsEnabled),
    );
  }, [notificationsEnabled, loaded]);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem("FOCUS_PERIOD", JSON.stringify(focusPeriod));
  }, [focusPeriod, loaded]);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem("SHORT_BREAK", JSON.stringify(shortBreak));
  }, [shortBreak, loaded]);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem("LONG_BREAK", JSON.stringify(longBreak));
  }, [longBreak, loaded]);

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="close" size={28} color={Theme.colors.divider} />
      </TouchableOpacity>

      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Configurações</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.formFieldContainer}>
            <Text style={styles.formFieldLabel}>Período de foco:</Text>

            <View style={styles.formFieldButtons}>
              <TouchableOpacity
                style={
                  focusPeriod === 15
                    ? styles.primaryButton
                    : styles.secondaryButton
                }
                onPress={() => setFocusPeriod(15)}
              >
                <Text style={styles.primaryButtonText}>15 min</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  focusPeriod === 25
                    ? styles.primaryButton
                    : styles.secondaryButton
                }
                onPress={() => setFocusPeriod(25)}
              >
                <Text style={styles.primaryButtonText}>25 min</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  focusPeriod === 35
                    ? styles.primaryButton
                    : styles.secondaryButton
                }
                onPress={() => setFocusPeriod(35)}
              >
                <Text style={styles.primaryButtonText}>35 min</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.formFieldContainer}>
            <Text style={styles.formFieldLabel}>Pausa curta:</Text>

            <View style={styles.formFieldButtons}>
              <TouchableOpacity
                style={
                  shortBreak === 3
                    ? styles.primaryButton
                    : styles.secondaryButton
                }
                onPress={() => setShortBreak(3)}
              >
                <Text style={styles.primaryButtonText}>3 min</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  shortBreak === 5
                    ? styles.primaryButton
                    : styles.secondaryButton
                }
                onPress={() => setShortBreak(5)}
              >
                <Text style={styles.primaryButtonText}>5 min</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  shortBreak === 7
                    ? styles.primaryButton
                    : styles.secondaryButton
                }
                onPress={() => setShortBreak(7)}
              >
                <Text style={styles.primaryButtonText}>7 min</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.formFieldContainer}>
            <Text style={styles.formFieldLabel}>Pausa longa:</Text>

            <View style={styles.formFieldButtons}>
              <TouchableOpacity
                style={
                  longBreak === 10
                    ? styles.primaryButton
                    : styles.secondaryButton
                }
                onPress={() => setLongBreak(10)}
              >
                <Text style={styles.primaryButtonText}>10 min</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  longBreak === 15
                    ? styles.primaryButton
                    : styles.secondaryButton
                }
                onPress={() => setLongBreak(15)}
              >
                <Text style={styles.primaryButtonText}>15 min</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  longBreak === 20
                    ? styles.primaryButton
                    : styles.secondaryButton
                }
                onPress={() => setLongBreak(20)}
              >
                <Text style={styles.primaryButtonText}>20 min</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.formFieldContainer}>
            <Text style={styles.formFieldLabel}>Notificações:</Text>

            <View style={styles.formFieldButtons}>
              <TouchableOpacity
                style={
                  notificationsEnabled
                    ? styles.secondaryButton
                    : styles.primaryButton
                }
                onPress={() => setNotificationsEnabled(false)}
              >
                <Text style={styles.primaryButtonText}>Desativado</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  notificationsEnabled
                    ? styles.primaryButton
                    : styles.secondaryButton
                }
                onPress={() => setNotificationsEnabled(true)}
              >
                <Text style={styles.primaryButtonText}>Ativado</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  primaryButton: {
    borderWidth: 2,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 55,
    borderColor: Theme.colors.primary,
    backgroundColor: Theme.colors.primary,
  },
  primaryButtonText: {
    color: Theme.colors.text,
    fontSize: Theme.fontSizes.body,
    fontFamily: Theme.fonts.interRegular,
  },
  secondaryButton: {
    borderWidth: 2,
    borderRadius: 55,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: Theme.colors.divider,
    backgroundColor: Theme.colors.divider,
  },
  secondaryButtonText: {
    color: Theme.colors.text,
    fontSize: Theme.fontSizes.body,
    fontFamily: Theme.fonts.interRegular,
  },
  titleContainer: {
    alignItems: "center",
  },
  titleText: {
    color: Theme.colors.text,
    fontSize: Theme.fontSizes.title,
    fontFamily: Theme.fonts.interBold,
  },
  formContainer: {
    gap: 16,
    width: "100%",
    maxWidth: 300,
    flexDirection: "column",
    justifyContent: "center",
  },
  formFieldContainer: {
    gap: 8,
    width: "100%",
  },
  formFieldLabel: {
    color: Theme.colors.text,
    fontSize: Theme.fontSizes.label,
    fontFamily: Theme.fonts.interRegular,
  },
  formFieldButtons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
