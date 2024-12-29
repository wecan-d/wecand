import React from 'react'
import { Route, Routes } from 'react-router-dom'

import WelcomePage from './pages/WelcomePage'
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
import { FormProvider } from './context/FormContext'
import SomePage from './pages/SomePage'

const Routers = () => {
  return (
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route
          path="/register/*"
          element={
            <FormProvider>
              <Routes>
                <Route path="1" element={<RegisterPage1 />} />
                <Route path="2" element={<RegisterPage2 />} />
                <Route path="3" element={<RegisterPage3 />} />
                <Route path="4" element={<RegisterPage4 />} />
                <Route path="edit/:id" element={<EditPage />} />
              </Routes>
            </FormProvider>
          }
        />
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/recruiting/:category" element={<RecruitingsPage />}/>
          <Route path="/detail/:postId" element={<DetailPage />}/>
          <Route path="/mypage" element={<MyPage/>}/>
          <Route path="/edit" element={<EditPage />} />
        </Route>
        <Route path="/land/:landId" element={<LandPage/>}/>
      </Routes>
  )
}

export default Routers;