import React from "react";
import { Switch, Route } from "react-router-dom";
import AddClubForm from '../Club/AddClubForm'
import ClubList from '../Club/ClubList'

export default function ClubRouter({setClubList, clubList, loadClub}) {
  return (
    <Switch>
      <Route path="/club/add">
        <AddClubForm setClubList={setClubList} />
      </Route>
      <Route path="/">
        <ClubList clubList={clubList} onClick={loadClub} />
      </Route>
    </Switch>
  );
}
