const formEle = document.querySelector("#searchForm");
const input = document.querySelector("input");
const container = document.querySelector(".res-container");
let p = document.createElement("p");
p.classList.add("res-text");

formEle.addEventListener("submit", function (e) {
  e.preventDefault();
  const search = formEle.q.value;
  const maxShow = formEle.limit.value;
  container.innerHTML = "";
  if (search != "") {
    getAnime(search, maxShow);
  } else {
    p.innerHTML = "please input anime name.";
    container.append(p);
  }
  input.value = "";
});

const getAnime = async (search, maxShow) => {
  try {
    let config;
    if (maxShow !== "all") {
      config = { params: { q: search, limit: parseInt(maxShow) } };
    } else {
      config = { params: { q: search, limit: "" } };
    }
    const res = await axios.get(`https://api.jikan.moe/v4/anime`, config);
    const data = res.data.data;
    dataCheck(data);
  } catch (error) {
    console.log("Error", error);
    p.innerHTML = "Error! :(";
    container.append(p);
  }
};

function dataCheck(data) {
  if (data.length == 0) {
    p.innerHTML = "Anime not found!";
    container.append(p);
  } else {
    renderImg(data);
  }
}

const renderImg = (data) => {
  for (const list of data) {
    if (list.images?.jpg.image_url) {
      const image = document.createElement("img");
      image.src = list.images.jpg.image_url;
      // image.classList.add('res-content')
      container.append(image);
    }
  }
};

// note: หาวิธีเคลียช่องเสิชให้ว่างหลังจากกดเสิช
// ถ้ามีการกดค้นหาครั้งต่อไปให้ลบข้อมูลเก่าที่แสดงออกมาก่อน
//problem is if we select maxshow morethan database have it will response error
//i will try resolve by create condition that tell the program if cant find the img url just show all you got.
//All Selector not resolve**

//Question: ถ้าอยากให้ตัวเลือก all ทำหน้าที่แสดงผลลัพธ์ททั้งหมดได้รับมาต้องทำยังไง?
//วิธีไหนดีกว่ากันระหว่าง remove tag htmlด้วย loop และ .remove() กับ set .innerHTML = "";
