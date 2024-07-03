import React, { useState } from 'react'
import Dashboard from './admin.dashboard';
import Trainers from './admin.trainers';
import Member from './admin.members';
import Classes from './admin.classes';

import "./admin.css";
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
export default function Admin() {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  };
  return (
    <>
      <div class="mainscreen">
        <input type="checkbox" id="togglemenu" checked={isChecked}
          onChange={handleCheckboxClick} />
        <header>
          <img src="../img/excelgymlogow.png" style={{ height: '80px' }} alt='' />
          <h1>EXCEL GYM</h1>
          <div class="menus">
            <a href="/" id="sign">Sign Out</a>
            <div class="menuabutton">
              <div class="menulogo">
                <label for="togglemenu"></label>
              </div>
            </div>
          </div>
        </header>
        <div class="dashboard">
          <ul class='adminsidebar'>
            <li><a href="dashboard">Dashboard</a></li>
            <li><a href="trainer">Trainers</a></li>
            <li><a href="member">Members</a></li>
            <li><a href="class">Classes</a></li>
          </ul>
          <Routes>
            <Route path="*" element={<Navigate to="dashboard" />} />
            <Route exact path="dashboard" element={<Dashboard />} />
            <Route exact path='trainer' element={<Trainers />} />
            <Route exact path='member' element={<Member />} />
            <Route exact path='class' element={<Classes />} />
          </Routes>
        </div>
      </div>
    </>
  )
}
