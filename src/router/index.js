import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import MyPapers from '@/views/achievement/MyPapers'
import Patent from '@/views/achievement/Patent'
import Achievement from '@/views/achievement/Achievement'
import Academicjournals from '@/views/achievement/Academicjournals'
import AcademicMonograph from '@/views/achievement/AcademicMonograph'
import Projects from '@/views/research/Projects'
import Funds from '@/views/research/Funds'
import Dynamics from '@/views/research/Dynamic'
import AcAward from '@/views/entryaward/AcAward'
import EntryAwards from '@/views/entryaward/EntryAwards'
import Announcement from '@/views/bulletin/Announcement'
import Acexchange from '@/views/bulletin/Acexchange'
import School from '@/components/School'
import VerifyProject from '@/views/research/VerifyProject'
import VerifyFund from '@/views/research/VerifyFunds'
import VerifyAcaward from '@/views/entryaward/VerifyAcAward'
import VerifyEntryAward from '@/views/entryaward/VerifyEntryAward'
import VerifyAcexchange from '@/views/bulletin/VerifyAcexchange'
import Profile from '@/views/customer/Profile'
import VerifyDynamic from '@/views/research/VerifyDynamic'
import VerifyAnnouncement from '@/views/bulletin/VerifyAnnouncement'
import VerifyAchievement from '@/views/achievement/VerifyAchievement'
import VerifyProfile from '@/views/customer/VerifyProfile'
import VerifyAcJournals from '@/views/achievement/VerifyAcJournals'
import VerifyAcMonograph from '@/views/achievement/VerifyAcMonograph'
import VerifyPaper from '@/views/achievement/VerifyPaper'
import VerifyPatent from '@/views/achievement/VerifyPatent'
import AcMentEcharts from '@/views/achievement/AcMentEcharts'
import PatentEcharts from '@/views/achievement/PatentEcharts'
import PaperEcharts from '@/views/achievement/PaperEcharts'
import AcjournalsEcharts from '@/views/achievement/AcjournalsEcharts'
import ProfileList from '@/views/customer/ProfileList'
import PassWord from '@/views/customer/password'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children:[
        {
          path: '/mypapers',
          name: 'mypapers',
          component: MyPapers
        },
        {
          path: '/academicmonograph',
          name: 'academicmonograph',
          component: AcademicMonograph
        },
        {
          path: '/patent',
          name: 'patent',
          component: Patent
        },
        {
          path: '/achievement',
          name: 'achievement',
          component: Achievement
        },
        {
          path: '/academicjournals',
          name: 'academicjournals',
          component: Academicjournals
        },
        {
          path: '/projects',
          name: 'projects',
          component: Projects
        },
        {
          path: '/funds',
          name: 'funds',
          component: Funds
        },
        {
          path: '/dynamics',
          name: 'dynamics',
          component: Dynamics
        },
        {
          path: '/acaward',
          name: 'acaward',
          component: AcAward
        },
        {
          path: '/entryawards',
          name: 'entryawards',
          component: EntryAwards
        },
        {
          path: '/announcement',
          name: 'announcement',
          component: Announcement
        },
        {
          path: '/acexchange',
          name: 'acexchange',
          component: Acexchange
        },
        {
          path: '/info',
          name: 'info',
          component: Profile
        },
        {
          path: '/acmentecharts',
          name: 'acmentecharts',
          component: AcMentEcharts
        },
        {
          path: '/patentecharts',
          name: 'patentecharts',
          component: PatentEcharts
        },
        {
          path: '/papercharts',
          name: 'papercharts',
          component: PaperEcharts
        },
        {
          path: '/acjournalsecharts',
          name: 'acjournalsecharts',
          component: AcjournalsEcharts
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/school',
      name: 'school',
      component: School,
      children:[
        {
          path: '/verifyacjournals',
          name: 'verifyacjournals',
          component: VerifyAcJournals
        },
        {
          path: '/verifyacmonograph',
          name: 'verifyacmonograph',
          component: VerifyAcMonograph
        },
        {
          path: '/verifypaper',
          name: 'verifypaper',
          component: VerifyPaper
        },
        {
          path: '/verifypatent',
          name: 'verifypatent',
          component: VerifyPatent
        },
        {
          path: '/verifyproject',
          name: 'verifyproject',
          component: VerifyProject
        },
        {
          path: '/verifyfund',
          name: 'verifyfund',
          component: VerifyFund
        },
        {
          path: '/verifyacaward',
          name: 'verifyacaward',
          component: VerifyAcaward
        },
        {
          path: '/verifyentryaward',
          name: 'verifyentryaward',
          component: VerifyEntryAward
        },
        {
          path: '/announcement',
          name: 'announcement',
          component: Announcement
        },
        {
          path: '/verifyacexchange',
          name: 'verifyacexchange',
          component: VerifyAcexchange
        },
        {
          path: '/verifydynamic',
          name: 'verifydynamic',
          component: VerifyDynamic
        },
        {
          path: '/verifyannouncement',
          name: 'verifyannouncement',
          component: VerifyAnnouncement
        },
        {
          path: '/verifyachievement',
          name: 'verifyachievement',
          component: VerifyAchievement
        },
        {
          path: '/verifyprofile',
          name: 'verifyprofile',
          component: VerifyProfile
        },
        {
          path: '/sacmentecharts',
          name: 'sacmentecharts',
          component: AcMentEcharts
        },
        {
          path: '/spatentecharts',
          name: 'spatentecharts',
          component: PatentEcharts
        },
        {
          path: '/spapercharts',
          name: 'spapercharts',
          component: PaperEcharts
        },
        {
          path: '/sacjournalsecharts',
          name: 'sacjournalsecharts',
          component: AcjournalsEcharts
        },
        {
          path: '/userprofile',
          name: 'userprofile',
          component: ProfileList
        },
        {
          path: '/password',
          name: 'password',
          component: PassWord
        }
      ]
    }
  ]
})
