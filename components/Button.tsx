import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { theme } from "../core/theme";

type Props = React.ComponentProps<typeof PaperButton>;

const Button = ({ mode, style, children, ...props }: Props) => (
  <PaperButton
    style={[
      styles.button,
    mode === "outlined" && { backgroundColor: '#ff0000' },
      style
    ]}
    labelStyle={[
      styles.text,
      mode === "contained" && { color: '#ffffff'}
    ]}
    mode={mode}
    {...props}
  >
    {children}
  </PaperButton>
);

const styles = StyleSheet.create({
  button: {
    width: "100%",
    marginVertical: 10,
    backgroundColor: '#2EC4B6'
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 26
  }
});

export default memo(Button);