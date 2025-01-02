import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import HomePage from './pages/HomePage'
import RegisterPage1 from './pages/RegisterPage1'
import RegisterPage2 from './pages/RegisterPage2'
import RegisterPage3 from './pages/RegisterPage3'
import RegisterPage4 from './pages/RegisterPage4'
import RecruitingsPage from './pages/RecruitingsPage'
import LandPage from './pages/LandPage'
import DetailPage from './pages/DetailPage'
import MyPage from './pages/MyPage'
import EditPage from './pages/EditPage'

import Layout from './components/Layout'
import MakeTeam from './pages/MakeTeam'
// import { useSetRecoilState } from 'recoil'
// import { loginInfo } from './context/Auth'

const Routers = () => {
  // const setLoginInfoState = useSetRecoilState(loginInfo);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const storedLoginInfo = localStorage.getItem('loginInfo');
  //   if(storedLoginInfo) {
  //     setLoginInfoState(JSON.parse(storedLoginInfo));
  //   }
  // }, [setLoginInfoState]);

  return (
      <Routes>
        {/* Home */}
        <Route index element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />

        {/* Register */}
        <Route path="/register" element={<Layout />}>
          <Route path="1" element={<RegisterPage1 />} />
          <Route path="2" element={<RegisterPage2 />} />
          <Route path="3" element={<RegisterPage3 />} />
          <Route path="4" element={<RegisterPage4 />} />
          <Route path="edit/:id" element={<EditPage />} />
        </Route>

        {/* Layout 안에 */}
        <Route element={<Layout />}>
          <Route path="/recruiting" element={<RecruitingsPage />}/>
          <Route path="/recruiting/:category" element={<RecruitingsPage />}/>
          <Route path="/maketeam" element={<MakeTeam />} />
          <Route path="/detail/:postId" element={<DetailPage />}/>
          <Route path="/mypage/:postId" element={<MyPage/>}/>
        </Route>

        {/* Land */}
        <Route path="/land/:landId" element={<LandPage/>}/>
      </Routes>
  )
}

export default Routers;