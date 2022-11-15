interface ICat {
  id: number;
  name: string;
  type: "DIRECTORY" | "FILE";
  filePath: string | null;
  parent: IParentCat | null;
}

interface IParentCat {
  id: number;
}

export const cats: ICat[] = [
  {
    id: 1,
    name: "2021/01",
    type: "DIRECTORY",
    filePath: null,
    parent: null,
  },
  {
    id: 2,
    name: "2021/02",
    type: "DIRECTORY",
    filePath: null,
    parent: null,
  },
  {
    id: 3,
    name: "2021/03",
    type: "DIRECTORY",
    filePath: null,
    parent: null,
  },
  {
    id: 4,
    name: "하얀 고양이",
    type: "FILE",
    filePath: "../../public/images/r1i.jpg",
    parent: null,
  },
  {
    id: 5,
    name: "달과 고양이",
    type: "FILE",
    filePath: "../../public/images/r2i.jpg",
    parent: null,
  },
  {
    id: 6,
    name: "2021/06",
    type: "DIRECTORY",
    filePath: null,
    parent: {
      id: 1,
    },
  },
  {
    id: 7,
    name: "2021/07",
    type: "DIRECTORY",
    filePath: null,
    parent: {
      id: 1,
    },
  },
  {
    id: 8,
    name: "기지개 펴는 고양이",
    type: "FILE",
    filePath: "../../public/images/a1i.jpg",
    parent: {
      id: 1,
    },
  },
  {
    id: 9,
    name: "하품하는 고양이",
    type: "FILE",
    filePath: "../../public/images/a2i.jpg",
    parent: {
      id: 1,
    },
  },
  {
    id: 10,
    name: "핸섬 고양이",
    type: "FILE",
    filePath: "../../public/images/aa1i.jpg",
    parent: {
      id: 6,
    },
  },
  {
    id: 11,
    name: "2021/11",
    type: "DIRECTORY",
    filePath: null,
    parent: {
      id: 7,
    },
  },
  {
    id: 12,
    name: "돌 위의 고양이",
    type: "FILE",
    filePath: "../../public/images/ab1i.jpg",
    parent: {
      id: 7,
    },
  },
  {
    id: 13,
    name: "무서운 고양이",
    type: "FILE",
    filePath: "../../public/images/aba1i.jpg",
    parent: {
      id: 11,
    },
  },
  {
    id: 14,
    name: "2022/02",
    type: "DIRECTORY",
    filePath: null,
    parent: {
      id: 2,
    },
  },
  {
    id: 15,
    name: "2022/03",
    type: "DIRECTORY",
    filePath: null,
    parent: {
      id: 2,
    },
  },
  {
    id: 16,
    name: "새하얀 고양이",
    type: "FILE",
    filePath: "../../public/images/b1i.jpg",
    parent: {
      id: 2,
    },
  },
  {
    id: 17,
    name: "휴식중인 고양이",
    type: "FILE",
    filePath: "../../public/images/b2i.jpg",
    parent: {
      id: 2,
    },
  },
  {
    id: 18,
    name: "장난치는 고양이",
    type: "FILE",
    filePath: "../../public/images/ba1i.jpg",
    parent: {
      id: 14,
    },
  },
  {
    id: 19,
    name: "샴 고양이",
    type: "FILE",
    filePath: "../../public/images/bb1i.jpg",
    parent: {
      id: 15,
    },
  },
  {
    id: 20,
    name: "웃는 고양이",
    type: "FILE",
    filePath: "../../public/images/bb2i.jpg",
    parent: {
      id: 15,
    },
  },
  {
    id: 21,
    name: "2022/11",
    type: "DIRECTORY",
    filePath: null,
    parent: {
      id: 3,
    },
  },
  {
    id: 22,
    name: "새끼고양이 3마리",
    type: "FILE",
    filePath: "../../public/images/c1i.jpg",
    parent: {
      id: 3,
    },
  },
  {
    id: 23,
    name: "2023/01",
    type: "DIRECTORY",
    filePath: null,
    parent: {
      id: 21,
    },
  },
  {
    id: 24,
    name: "꽃밭의 고양이",
    type: "FILE",
    filePath: "../../public/images/ca1i.jpg",
    parent: {
      id: 21,
    },
  },
  {
    id: 25,
    name: "2023/03",
    type: "DIRECTORY",
    filePath: null,
    parent: {
      id: 23,
    },
  },
  {
    id: 26,
    name: "2023/04",
    type: "DIRECTORY",
    filePath: null,
    parent: {
      id: 23,
    },
  },
  {
    id: 27,
    name: "새까만 고양이",
    type: "FILE",
    filePath: "../../public/images/caa1i.jpg",
    parent: {
      id: 23,
    },
  },
  {
    id: 28,
    name: "얼굴 큰 고양이",
    type: "FILE",
    filePath: "../../public/images/caaa1i.jpg",
    parent: {
      id: 25,
    },
  },
  {
    id: 29,
    name: "고양이가 아닌 호랑이",
    type: "FILE",
    filePath: "../../public/images/caab1i.jpg",
    parent: {
      id: 26,
    },
  },
];
