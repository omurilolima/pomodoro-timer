import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { TNavigationScreenProps } from "../appRoutes";
import { Theme } from "../shared/themes/Theme";
import { StyleSheet } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";

export const Settings = () => {
  const navigation = useNavigation<TNavigationScreenProps>();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [focusPeriod, setFocusPeriod] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);

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
