import React, { useState } from "react";
import { useToast } from "./Hooks/useToast";
import TextInput from "./forms/Components/TextInput";
import { clubAPI } from "./API/clubAPI";
import { useHistory } from "react-router-dom";

export default function AddClubForm({ setClubList }) {
  const { push } = useHistory();
  const toast = useToast();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  function validateForm() {
    let valid = true;
    if (!name) {
      valid = false;
      toast({ message: "Club name required", type: "error" });
      setNameError(true);
    }
    return valid;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const newClub = await clubAPI.addClub({ name });
      setClubList((list) => [...list, newClub]);
      toast({ message: "Club created", type: "success" });
      push("/");
    } catch (error) {
      toast({ message: "Server error", type: "error" });
    }
  }

  return (
    <section className="AddClubForm">
      <form onSubmit={handleSubmit}>
        <h2>Create Club</h2>
        <TextInput
          label="Club name:"
          id="clubname"
          value={name}
          error={nameError}
          onChange={(e) => setName(e.target.value)}
        />
        <input type="submit" value="Create Club" />
      </form>
    </section>
  );
}
