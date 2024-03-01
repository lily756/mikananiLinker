const { removeFansub, getBanguName, getEpisode,getfileExtra } = require("./main");

const filename = [
  "[ANi] 葬送的芙莉蓮 - 04 [1080P][Baha][WEB-DL][AAC AVC][CHT].mkv",
  "[GJ.Y] Isekai de Mofumofu Nadenade suru Tame ni Ganbattemasu. - 05 (CR 1920x1080 AVC AAC MKV) [EB685B6D].mp4",
  "[Sakurato] Dungeon Meshi [01][AVC-8bit 1080p AAC][CHS].avi",
  "[KissSub&Romanticat][Mahou Shoujo ni Akogarete][07][720P][GB][MP4].mp4",
  "[Nekomoe kissaten][Ishura][09][1080p][JPTC].mp4",
  "[Nekomoe kissaten][Ishura][09v2][1080p][JPTC].mp4",
  "[萌樱字幕组&新字幕组][1月新番][到了30岁还是处男，似乎会变成魔法师][05][HEVC][10Bit][1080P][简日双语][招募翻译].mp4",
  "[LoliHouse] Shin no Nakama 2nd - 08v2 [WebRip 1080p HEVC-10bit AAC SRTx2].ts",
];

const fanSubRemoved = [
  " 葬送的芙莉蓮 - 04 [1080P][Baha][WEB-DL][AAC AVC][CHT].mkv",
  " Isekai de Mofumofu Nadenade suru Tame ni Ganbattemasu. - 05 (CR 1920x1080 AVC AAC MKV) [EB685B6D].mp4",
  " Dungeon Meshi [01][AVC-8bit 1080p AAC][CHS].avi",
  "[Mahou Shoujo ni Akogarete][07][720P][GB][MP4].mp4",
  "[Ishura][09][1080p][JPTC].mp4",
  "[Ishura][09v2][1080p][JPTC].mp4",
  "[到了30岁还是处男，似乎会变成魔法师][05][HEVC][10Bit][1080P][简日双语][招募翻译].mp4",
  " Shin no Nakama 2nd - 08v2 [WebRip 1080p HEVC-10bit AAC SRTx2].ts",
];

const banguName = [
  "葬送的芙莉蓮",
  "Isekai de Mofumofu Nadenade suru Tame ni Ganbattemasu.",
  "Dungeon Meshi",
  "Mahou Shoujo ni Akogarete",
  "Ishura",
  "Ishura",
  "到了30岁还是处男，似乎会变成魔法师",
  "Shin no Nakama 2nd",
];

const extra = [
  " - 04 [1080P][Baha][WEB-DL][AAC AVC][CHT].mkv",
  " - 05 (CR 1920x1080 AVC AAC MKV) [EB685B6D].mp4",
  "[01][AVC-8bit 1080p AAC][CHS].avi",
  "[07][720P][GB][MP4].mp4",
  "[09][1080p][JPTC].mp4",
  "[09v2][1080p][JPTC].mp4",
  "[05][HEVC][10Bit][1080P][简日双语][招募翻译].mp4",
  " - 08v2 [WebRip 1080p HEVC-10bit AAC SRTx2].ts",
];

const ep = ["04", "05", "01", "07", "09", "09", "05", "08"];

const fileExtra = [".mkv", ".mp4", ".avi", ".mp4", ".mp4", ".mp4", ".mp4", ".ts"];

test("remove FanSub name", () => {
  for (let index = 0; index < filename.length; index++) {
    const element = filename[index];
    expect(removeFansub(element)).toBe(fanSubRemoved[index]);
  }
});

test("get bangumi name", () => {
  for (let index = 0; index < fanSubRemoved.length; index++) {
    const element = fanSubRemoved[index];
    expect(getBanguName(element)).toEqual({
      name: banguName[index],
      extra: extra[index],
    });
  }
});

test("get episode", () => {
  for (let index = 0; index < extra.length; index++) {
    const element = extra[index];
    expect(getEpisode(element)).toBe(ep[index]);
  }
});

test('getFileExtra',()=>{
    for (let index = 0; index < filename.length; index++) {
        const element = filename[index];
        expect(getfileExtra(element)).toBe(fileExtra[index]);
      }
})
