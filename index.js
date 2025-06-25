const formEle = document.querySelector("#searchForm");
const input = document.querySelector("#input1");
const input2 = document.querySelector("#input2");
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
      image.classList.add("res-content")
      container.append(image);
    }
  }
};
// end searchForm 1
// start seachForm 2
const searchBox2 = document.querySelector("#search-container2");
const searchBtn2 = document.querySelector("#search-btn2");
const overlay = document.createElement("div");
const formEle2 = document.querySelector("#searchForm-2");

overlay.classList.add(
  "fixed",
  "top-0",
  "left-0",
  "w-full",
  "h-full",
  "backdrop-blur-[5px]",
  "hidden"
);
document.body.append(overlay);

searchBtn2.addEventListener("click", (e) => {
  e.stopPropagation();
  searchBox2.classList.toggle("hidden");
  overlay.classList.toggle("hidden");

  if (searchBox2.classList.contains("hidden")) {
    overlay.classList.remove("z-999");
    searchBox2.classList.remove("z-1000");
  } else {
    overlay.classList.add("z-999");
    searchBox2.classList.add("z-1000");
  }
});

formEle2.addEventListener("submit", (f) => {
  f.preventDefault();
  const search2 = formEle2.q.value;
  const maxShow2 = formEle2.limit.value;
  container.innerHTML = "";
  if (search2 != "") {
    getAnime(search2, maxShow2);
  } else {
    p.innerHTML = "please input anime name.";
    container.append(p);
  }
  input2.value = "";
});

document.addEventListener("click", (e) => {
  if (!searchBox2.contains(e.target) && e.target !== searchBtn2) {
    searchBox2.classList.add("hidden");
    overlay.classList.add("hidden");
  }
});
// searchForm 2 end

// note: หาวิธีเคลียช่องเสิชให้ว่างหลังจากกดเสิช
// ถ้ามีการกดค้นหาครั้งต่อไปให้ลบข้อมูลเก่าที่แสดงออกมาก่อน
//problem is if we select maxshow morethan database have it will response error
//i will try resolve by create condition that tell the program if cant find the img url just show all you got.
//All Selector not resolve**

//Question: ถ้าอยากให้ตัวเลือก all ทำหน้าที่แสดงผลลัพธ์ททั้งหมดได้รับมาต้องทำยังไง?
//วิธีไหนดีกว่ากันระหว่าง remove tag htmlด้วย loop และ .remove() กับ set .innerHTML = "";
