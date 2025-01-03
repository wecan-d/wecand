//!! 유저 아이디 2로 고정
//내가 생성한 글, /post/owner/{userId}
//   /post/owner/2

export const owner = [
  [
    {
      "postId": 1,
      "title": "React 프로젝트 모집",
      "category": "IT/프로그래밍",
      "date": "2024-01-15",
      "member": 3,
      "url": "https://example.com/react-project",
      "memo": "React 프로젝트를 함께 진행할 팀원을 찾습니다.",
      "memo2": "경력 1년 이상, Git 사용 경험 필수",
      "img": "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDExMTNfODgg%2FMDAxNzMxNDg0NjY1MDYw.WAEjYxKnQWC1pCmufVigQHU-4FBj_80Oigj45cnrvYog.O4c01V5bTAAHXSuUXBbZ7HhNpTQrG2Hcwp7Rx7LCPegg.PNG%2F3.png&type=a340https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDExMTNfODgg%2FMDAxNzMxNDg0NjY1MDYw.WAEjYxKnQWC1pCmufVigQHU-4FBj_80Oigj45cnrvYog.O4c01V5bTAAHXSuUXBbZ7HhNpTQrG2Hcwp7Rx7LCPegg.PNG%2F3.png&type=a340",
      "createTime": "2024-01-01",
      "ownerId": 2,
      "applicants": [
        {
          "applicationId": 1,
          "userId": 2,
          "userName": "김철수",
          "userEmail": "chulsu@example.com",
          "status": "수락"
        },
        {
          "applicationId": 2,
          "userId": 3,
          "userName": "박영희",
          "userEmail": "younghee@example.com",
          "status": "대기중"
        }
      ],
      "imageUrl": "https://example.com/react-project-image.jpg",
      "approvedCount": 4,
      "totalApplicants": 5
    },
    {
      "postId": 2,
      "title": "디자인 공모전 참가자 모집",
      "category": "디자인",
      "date": "2024-02-01",
      "member": 5,
      "url": "https://example.com/design-contest",
      "memo": "디자인 공모전에 함께 참가할 팀원을 모집합니다.",
      "memo2": "포토샵, 일러스트레이터 사용 가능자 우대",
      "img": "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDExMTNfODgg%2FMDAxNzMxNDg0NjY1MDYw.WAEjYxKnQWC1pCmufVigQHU-4FBj_80Oigj45cnrvYog.O4c01V5bTAAHXSuUXBbZ7HhNpTQrG2Hcwp7Rx7LCPegg.PNG%2F3.png&type=a340https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDExMTNfODgg%2FMDAxNzMxNDg0NjY1MDYw.WAEjYxKnQWC1pCmufVigQHU-4FBj_80Oigj45cnrvYog.O4c01V5bTAAHXSuUXBbZ7HhNpTQrG2Hcwp7Rx7LCPegg.PNG%2F3.png&type=a340",
      "createTime": "2024-01-10",
      "ownerId": 2,
      "applicants": [
        {
          "applicationId": 21,
          "userId": 203,
          "userName": "이수민",
          "userEmail": "sumin@example.com",
          "status": "approved"
        }
      ],
      "imageUrl": "https://example.com/design-contest-image.jpg",
      "approvedCount": 1,
      "totalApplicants": 2
    },
    {
      "postId": 3,
      "title": "Python 튜토리얼 제작팀 모집",
      "category": "IT/프로그래밍",
      "date": "2024-03-01",
      "member": 2,
      "url": "https://example.com/python-tutorial",
      "memo": "Python 튜토리얼 제작을 위한 팀원을 모집합니다.",
      "memo2": "Python 경험 2년 이상, 교육 자료 제작 경험 우대",
      "img": "https://example.com/image3.jpg",
      "createTime": "2024-01-20",
      "ownerId": 2,
      "applicants": [],
      "imageUrl": "https://example.com/python-tutorial-image.jpg",
      "approvedCount": 0,
      "totalApplicants": 0
    }
  ]
];


//!! 유저 아이디 2로 고정
//내가 지원한 글 /post/applied/{userId}
// /post/applied/2

export const applied = [
  {
    "postId": 1,
    "title": "Gemlense 프로젝트 모집",
    "category": "IT/프로그래밍",
    "date": "2024-01-15",
    "member": 3,
    "url": "https://example.com/react-project",
    "memo": "React 프로젝트를 함께 진행할 팀원을 찾습니다.",
    "memo2": "Git 사용 경험 필수",
    "img": "https://example.com/image1.jpg",
    "createTime": "2024-01-01",
    "ownerId": 2,
    "applicants": [
      {
        "applicationId": 1,
        "userId": 1,
        "userName": "김철수",
        "userEmail": "chulsu@example.com",
        "status": "수락"
      },
      {
        "applicationId": 2,
        "userId": 3,
        "userName": "박영희",
        "userEmail": "younghee@example.com",
        "status": "대기중"
      }
    ],
    "imageUrl": "https://example.com/react-project-image.jpg",
    "approvedCount": 1
  },
  {
    "postId": 2,
    "title": "잼민이 포켓몬 카드",
    "category": "디자인",
    "date": "2024-02-01",
    "member": 5,
    "url": "https://example.com/design-contest",
    "memo": "디자인 공모전에 함께 참가할 팀원을 모집합니다.",
    "memo2": "포토샵, 일러스트레이터 사용 가능자 우대",
    "img": "https://example.com/image2.jpg",
    "createTime": "2024-01-10",
    "ownerId": 2,
    "applicants": [
      {
        "applicationId": 2,
        "userId": 2,
        "userName": "이수민",
        "userEmail": "sumin@example.com",
        "status": "대기중"
      }
    ],
    "imageUrl": "https://example.com/design-contest-image.jpg",
    "approvedCount": 0
  },
  {
    "postId": 3,
    "title": "Python 튜토리얼 제작팀 모집",
    "category": "IT/프로그래밍",
    "date": "2024-03-01",
    "member": 2,
    "url": "https://example.com/python-tutorial",
    "memo": "Python 튜토리얼 제작을 위한 팀원을 모집합니다.",
    "memo2": "Python 경험 2년 이상 우대",
    "img": "https://example.com/image3.jpg",
    "createTime": "2024-01-20",
    "ownerId": 2,
    "applicants": [
        {
        "applicationId": 2,
        "userId": 2,
        "userName": "이수민",
        "userEmail": "sumin@example.com",
        "status": "대기중"
      }
    ],
    "imageUrl": "https://example.com/python-tutorial-image.jpg",
    "approvedCount": 1
  },
  {
    "postId": 4,
    "title": "음하하 로직 구현 완료",
    "category": "디자인",
    "date": "2024-03-01",
    "member": 2,
    "url": "https://example.com/python-tutorial",
    "memo": "Python 튜토리얼 제작을 위한 팀원을 모집합니다.",
    "memo2": "Python 경험 2년 이상 우대",
    "img": "https://example.com/image3.jpg",
    "createTime": "2024-01-20",
    "ownerId": 2,
    "applicants": [
        {
        "applicationId": 2,
        "userId": 2,
        "userName": "이수민",
        "userEmail": "sumin@example.com",
        "status": "거절"
      }
    ],
    "imageUrl": "https://example.com/python-tutorial-image.jpg",
    "approvedCount": 1
  },

  {
    "postId": 5,
    "title": "음하하 롱커톤 1등 각",
    "category": "디자인",
    "date": "2024-03-01",
    "member": 2,
    "url": "https://example.com/python-tutorial",
    "memo": "Python 튜토리얼 제작을 위한 팀원을 모집합니다.",
    "memo2": "Python 경험 2년 이상 우대",
    "img": "https://example.com/image3.jpg",
    "createTime": "2024-01-20",
    "ownerId": 2,
    "applicants": [
        {
        "applicationId": 2,
        "userId": 2,
        "userName": "이수민",
        "userEmail": "sumin@example.com",
        "status": "대기중",
        
      }
    ],
    "imageUrl": "https://example.com/python-tutorial-image.jpg",
    "approvedCount": 1,
    "status": "{\"status\":\"수락\"}"
    
  }
];



export const UserCard = [
  { 
    "userId": 1,
    "cardId": 101,
    "name": "김철수",
    "gender": "남성",
    "identity": "학생",
    "major": "컴퓨터공학",
    "age": 22,
    "phone": "010-1234-5678",
    "email": "chulsu@example.com",
    "communication": [
      "대면 소통을 선호합니다.",
      "그룹 토론을 좋아합니다."
    ],
    "teamwork": [
      "팀 내에서 잘 협력합니다.",
      "협업 프로젝트에서 주도적인 역할을 맡습니다."
    ],
    "thinking": [
      "논리적인 문제 해결을 선호합니다.",
      "창의적인 아이디어를 제시합니다."
    ],
    "role": [
      "팀 리더 역할을 맡습니다.",
      "아이디어 제안자로 활동합니다."
    ],
    "conflictResolution": [
      "효과적으로 갈등을 중재합니다.",
      "타협에 열려 있습니다."
    ],
    "timePreference": [
      "오전 회의를 선호합니다.",
      "기한을 엄격히 준수합니다."
    ],
    "restPreference": [
      "짧은 휴식을 자주 취합니다.",
      "조용한 환경에서 재충전을 선호합니다."
    ],
    "friendship": [
      "장기적인 인간관계를 중요하게 여깁니다.",
      "비공식적인 팀 활동을 즐깁니다."
    ],
    "important": "정직함과 명확한 의사소통",
    "certificates": [
      "Scrum Master 인증",
      "AWS 솔루션 아키텍트 인증"
    ],
    "tools": [
      "Jira",
      "Figma",
      "GitHub"
    ],
    "awards": [
      "2022 학장 명단",
      "2021 해커톤 우승"
    ],
    "portfolio": [
      "https://portfolio.example.com/honggildong"
    ],
    "additionalInfo": "새로운 도구와 기술을 배우는 데 열려 있습니다.",
    "url": [
      "https://github.com/honggildong",
      "https://linkedin.com/in/honggildong"
    ]
  }
]