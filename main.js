const names = [
  "[ANi] 葬送的芙莉蓮 - 04 [1080P][Baha][WEB-DL][AAC AVC][CHT].mkv",
  "[GJ.Y] Isekai de Mofumofu Nadenade suru Tame ni Ganbattemasu. - 05 (CR 1920x1080 AVC AAC MKV) [EB685B6D].mp4",
  "[Sakurato] Dungeon Meshi [01][AVC-8bit 1080p AAC][CHS].avi",
  "[KissSub&Romanticat][Mahou Shoujo ni Akogarete][07][720P][GB][MP4].mp4",
  "[Nekomoe kissaten][Ishura][09][1080p][JPTC].mp4",
  '[Nekomoe kissaten][Ishura][09v2][1080p][JPTC].mp4',
  "[萌樱字幕组&新字幕组][1月新番][到了30岁还是处男，似乎会变成魔法师][05][HEVC][10Bit][1080P][简日双语][招募翻译].mp4",
  "[LoliHouse] Shin no Nakama 2nd - 08v2 [WebRip 1080p HEVC-10bit AAC SRTx2].ts"
];

function removeFansub(name) {
  const pattern = /(\[|【).*?(\]|】)/g;
  const report = name.match(pattern);
  if (Array.isArray(report)) {
    if (report[1].indexOf("番") >= 0) {
      // console.log(report[0]+report[1])
      name = name.replace(report[0], "");
      name = name.replace(report[1], "");
      return name;
    } else {
      name = name.replace(report[0], "");
      return name;
    }
  }
}

function getBanguName(name) {
  if (name[0] === " ") {
    name = name.trim();
    const index = name.indexOf(" - ");
    if (index >= 0) {
      return {name:name.slice(0, index),extra:name.slice(index)};
    } else {
      return {name:name.slice(0, name.indexOf("[")).trim(),extra:name.slice(name.indexOf("["))};
    }
  } else if (name[0] === "[") {
    const index = name.indexOf(']')
    return {name:name.slice(1,index),extra:name.slice(index+1)};
  } else {
  }
}

function getEpisode(name){
    const pattern1 = /\s-\s[0-9]*?(v[0-9])*\s/g;
    const pattern2 = /\[[0-9]*?(v[0-9])*\]/g;
    if(pattern1.test(name)){
        const ep = name.match(pattern1)
        return ep[0].replace(/\s-\s|v[0-9]*/g,'').trim()
    }else if(pattern2.test(name)){
        const ep = name.match(pattern2)
        return ep[0].replace(/\[|\]|v[0-9]*/g,'').trim()
        // return name.match(pattern2)
    }
}

function getfileExtra(name){
    const lastPointIndex = name.lastIndexOf('.')
    return name.slice(lastPointIndex)
}

function main() {
  for (const iterator of names) {
    const firstStep = removeFansub(iterator);
    const secondStep = getBanguName(firstStep);
    const thirdStep = getEpisode(secondStep.extra)
    const extra = getfileExtra(iterator)
    console.log({name:secondStep.name,ep:thirdStep,extra:extra})
  }
}

main();

module.exports = {
    removeFansub,
    getBanguName,
    getEpisode,
    getfileExtra
}