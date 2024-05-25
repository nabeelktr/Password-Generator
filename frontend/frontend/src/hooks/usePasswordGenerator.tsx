import { useState } from "react";
const usePasswordGenerator = () => {
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const generatePassword = (checkboxData: any, passLength: any) => {
    let charset = "",
      generatedPassword = "";

    const selectedOption = checkboxData.filter((checkbox: any) => checkbox.state);

    if (selectedOption.length === 0) {
      setError("select any option");
      setPassword("");
      return;
    }

    selectedOption.forEach((option: any) => {
      switch (option.title) {
        case "uppercase":
          charset += "ABCDEFGHIJKLMNNOPQRSTUWXYZ";
          break;
        case "lowercase":
          charset += "abcdefghijklmnopqrstuvwxyz";
          break;
        case "numbers":
          charset += "0123456789";
          break;
        case "symbols":
          charset += "!@#$%^&*()_-+?/{}[]";
          break;
        default:
          break;
      }
    });

    for (let index = 0; index < passLength; index++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }

    setPassword(generatedPassword);
    setError("");
    if (generatedPassword) {
      
    }
  };
  return { password, error, generatePassword };
};

export default usePasswordGenerator;
