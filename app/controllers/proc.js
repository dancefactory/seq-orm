const db = require("../models");
const crud = require("./reuseCRUD");
const _ = require("lodash");
const Op = db.Sequelize.Op;

/**
 * nested된 입력내용을 풀어서 아래 4개의 테이블에 저장
 * Dance
 * Genre
 * User
 * UserParticipation
 * @param {*} body
 */
const dancesingleinput = async (body) => {
  const dancedata = {
    title: body.title,
    story: body.story,
    video_url: body.videoThum,
    thumbnail_url: body.videoThum,
    youtube_registration_date: new Date(),
    genre: JSON.stringify(body.genre),
    tags: JSON.stringify(body.tags),
  };

  const rtndance = await db.dance.create(dancedata);

  body.genre.map(async (k, i) => {
    await db.dancegenre.create({ dance_id: rtndance.id, genre_id: k });
  });
  body.creator.map(async (k, i) => {
    let id = k.id;
    if (!k.id) {
      const usr = await db.user.create({
        nickname: k.name,
        avatar_url: k.imgUrl,
        created_at: new Date(),
      });
      id = usr.id;
    }

    await db.userparticipation.create({
      role: k.role,
      dance_id: rtndance.id,
      user_id: id,
    });
  });
};
exports.danceInput = async (req, res) => {
  // multi로 입력할 경우 루프를 돌리세요
  dancesingleinput(req.body);

  return res.json("ok");
};

/**
 * dance table안에 genre (array)필드에 코드로 된 것을 이름으로 변환
 * @param {
 * } list
 * @param {*} arr
 * @returns
 */
const genreConvert = (list, arr) => {
  if (!arr) return [];
  arr.map((k, i) => {
    list.map((s, j) => {
      if (s.id === k) {
        arr.splice(i, 1, s.name);
      }
    });
  });

  return arr;
};

/**
 * dance를 여러 검색조건에 따라 필터링해서 가져오는 api
 * parameter type: userparticipation, collection, genre, 혹은  null (전체)
 * parameter id: user id나 장르 id 값, 혹은 null(전체)
 * userparticipation과 collection은  user id이고 장르는 장르id입니다.  유저검색=> api.moverse.club/api/user:
 */
exports.danceGetAll = async (req, res) => {
  let [dancertn1, genrelist] = await Promise.all([
    db.sequelize.query("CALL dancegetmulti(:type,:id)", {
      replacements: {
        type: req.body.type,
        id: req.body.id,
      },
      type: db.sequelize.QueryTypes.SELECT,
    }),

    db.genre.findAll(),
  ]);
  const dlist = Object.values(dancertn1[0]);
  let keylist = dlist.map((k, i) => {
    return k.id;
  });
  let outarr = [];
  keylist = _.uniq(keylist);
  keylist.map((k, i) => {
    const tarr = _.filter(dlist, (o) => o.id === k);
    outarr.push(makeDance(tarr, genrelist));
  });

  return res.json(outarr);
};
/**
 * dance에 creator를 join해서 리턴한 것을
 * dance.creator로 nest하기 위한 함수
 * @param {*} arr : dance+creator array
 * @param {*} genrelist : 장르코드/이름 전체
 * @returns
 */
const makeDance = (arr, genrelist) => {
  //dance는 계속반복되니 첫번째 것만 추출해서 사용
  let cleandance = arr[0];
  delete cleandance.nickname;
  delete cleandance.role;
  delete cleandance.avatar_url;

  let i = 0,
    obj;

  const num = Object.values(arr);
  creator = num.map((k, i) => {
    obj = {};
    obj.nickname = k["nickname"];
    obj.role = k["role"];
    obj.avatar_url = k["avatar_url"];
    return obj;
  });
  //첫번째 dance에 creator를 추가함
  cleandance.creator = creator;
  cleandance.tags = JSON.parse(cleandance.tags);
  cleandance.genre = genreConvert(genrelist, JSON.parse(cleandance.genre));
  return cleandance;
};
exports.danceGet = async (req, res) => {
  let [dancertn, genrelist] = await Promise.all([
    db.sequelize.query("CALL danceget(:id)", {
      replacements: {
        id: req.body.id,
      },
      type: db.sequelize.QueryTypes.SELECT,
    }),

    db.genre.findAll(),
  ]);

  return res.json(makeDance(dancertn[0], genrelist));
};
/**
 * 서치 스트링에 따라 nickname을 like 로 필터
 * @param {*} req
 * @param {*} res
 */
exports.userlike = (req, res) => {
  db.user
    .findAll({
      limit: 100,
      where: {
        nickname: {
          [Op.like]: "%" + req.query.search + "%",
        },
      },
    })
    .then(function (usr) {
      return res.json(usr);
    })
    .catch(function (error) {
      console.log(error);
    });
};
