import { Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";

function OutlinedButton({ onPress, icon, children }) {
  return (
    <Pressable
      style={(pressed) => [style.button, pressed && style.pressed]}
      onPress={onPress}
    >
      <Ionicons
        style={style.icon}
        name={icon}
        size={18}
        color={Colors.primary500}
      />
      <Text style={style.text}>{children}</Text>
    </Pressable>
  );
}

export default OutlinedButton;

const style = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.primary500,
  },
  pressed: { opacity: 0.7 },
  icon: {
    marginRight: 6,
  },
  text: {
    color: Colors.primary500,
  },
});
