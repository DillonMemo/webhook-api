// example
// {
//     token: '3d23d15c379c7b8324838c1281056a1d',
//     teamName: 'STABY',
//     roomName: '20585157:24530532',
//     writerName: "('ㅁ')b",
//     writerEmail: 'dillon@staby.co.kr',
//     text: '/검색 ㅋㅋㅋ',
//     data: 'ㅋㅋㅋ',
//     keyword: '검색',
//     createdAt: '2021-05-29T07:42:36.693Z',
//     platform: 'web',
//     ip: '175.208.173.206'
// }
export interface CoreInput {
  token: string;
  teamName: string;
  roomName: string;
  writerName: string;
  writerEmail: string;
  text: string;
  data: string;
  keyword: string;
  createdAt: string;
  platform: string;
  ip: string;
}

export interface CoreOutput {
  ok: boolean;
  error?: string;
}

interface IncomingInfos {
  title: string;
  description: string;
  imageUrl?: string;
}
export interface IncomingInput {
  body: string;
  connectColor?: string;
  connectInfo?: IncomingInfos[];
}
