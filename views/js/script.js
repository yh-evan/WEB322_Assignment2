/* Add any JavaScript you need to this file. */
window.onload = function () {

  let p_list = document.querySelector(".products_list");

  let bo = document.createElement("div");
  bo.className = "bo";
  p_list.appendChild(bo);

  all();


  document.querySelector("#all").addEventListener("click", function () {
    bo.innerHTML = "";
    all();
    
  })

  function all() {

  card(bo, "./img/list01.jpg", "h4_sand", "Beoplay H4 2nd Gen" + "<" + "br" + ">", "Pure expression. Superior sound", "$475");
  card(bo, "./img/list02.jpg", "h8i_natural", "Beoplay H8i" + "<" + "br" + ">", "Revitalizing a modern classic", "$500");
  card(bo, "./img/list03.jpg", "h8i_pink", "Beoplay H9 3rd Gen" + "<" + "br" + ">", "ANC headphones with long battery life", "$600");
  card(bo, "./img/list04.jpg", "e8_green", "Beoplay E8 Sport" + "<" + "br" + ">", "Powerful Bluetooth sports earphones", "$475");
  card(bo, "./img/list05.jpg", "e8_3rd", "Beoplay E8 3rd Gen" + "<" + "br" + ">", "More compact. More powerful.", "$475");
  card(bo, "./img/list06.jpg", "e8_on", " Beoplay E8 Sport On Edition" + "<" + "br" + ">", "Bluetooth earphones - limited edition", "$475");
  }
  document.querySelector("#on-ear").addEventListener("click", function () {
    bo.innerHTML = "";
    card(bo, "./img/h4_sand.png", "h4_sand", "Beoplay H4 2nd Gen" + "<" + "br" + ">", "Pure expression. Superior sound", "$475");
    card(bo, "./img/h8i_natural.png", "h8i_natural", "Beoplay H8i" + "<" + "br" + ">", "Revitalizing a modern classic", "$500");
    card(bo, "./img/h9_b&o_pink.png", "h8i_pink", "Beoplay H9 3rd Gen" + "<" + "br" + ">", "ANC headphones with long battery life", "$600");
  })

  document.querySelector("#in-ear").addEventListener("click", function () {
    bo.innerHTML = "";
    card(bo, "./img/E8_sport_green_1.png", "e8_green", "Beoplay E8 Sport" + "<" + "br" + ">", "Powerful Bluetooth sports earphones", "$475");
    card(bo, "./img/PS_E8_3rdGen_Pink_Hero.png", "e8_3rd", "Beoplay E8 3rd Gen" + "<" + "br" + ">", "More compact. More powerful.", "$475");
    card(bo, "./img/E8_x_on_8.png", "e8_on", " Beoplay E8 Sport On Edition" + "<" + "br" + ">", "Bluetooth earphones - limited edition", "$475");
    card(bo, "./img/e4_1000x1000.png", "e4", "Beoplay E4" + "<" + "br" + ">", "The power of silence", "$330");
    card(bo, "./img/wireless_earbuds_e6_sky_ss19.png", "e6_white", "Beoplay E8 Sport" + "<" + "br" + ">", "Power the motion", "$275");
    card(bo, "./img/h3_black_1000x1000.png", "h3_black", "Beoplay H3" + "<" + "br" + ">", "Pure and powerful sound", "$200");
  })

  document.querySelector("#wired").addEventListener("click", function () {
    bo.innerHTML = "";
    card(bo, "./img/e4_1000x1000.png", "e4", "Beoplay E4" + "<" + "br" + ">", "The power of silence", "$330");
    card(bo, "./img/h3_black_1000x1000.png", "h3_black", "Beoplay H3" + "<" + "br" + ">", "Pure and powerful sound", "$200");
  })

  document.querySelector("#wireless").addEventListener("click", function () {
    bo.innerHTML = "";
    card(bo, "./img/h4_sand.png", "h4_sand", "Beoplay H4 2nd Gen" + "<" + "br" + ">", "Pure expression. Superior sound", "$475");
    card(bo, "./img/h8i_natural.png", "h8i_natural", "Beoplay H8i" + "<" + "br" + ">", "Revitalizing a modern classic", "$500");
    card(bo, "./img/h9_b&o_pink.png", "h8i_pink", "Beoplay H9 3rd Gen" + "<" + "br" + ">", "ANC headphones with long battery life", "$600");
    card(bo, "./img/E8_sport_green_1.png", "e8_green", "Beoplay E8 Sport" + "<" + "br" + ">", "Powerful Bluetooth sports earphones", "$475");
    card(bo, "./img/PS_E8_3rdGen_Pink_Hero.png", "e8_3rd", "Beoplay E8 3rd Gen" + "<" + "br" + ">", "More compact. More powerful.", "$475");
    card(bo, "./img/E8_x_on_8.png", "e8_on", " Beoplay E8 Sport On Edition" + "<" + "br" + ">", "Bluetooth earphones - limited edition", "$475");
    card(bo, "./img/wireless_earbuds_e6_sky_ss19.png", "e6_white", "Beoplay E8 Sport" + "<" + "br" + ">", "Power the motion", "$275");
  })

};







function card(brand, src, alt, name, cmt, pri) {

  let Link = document.createElement("a");
  Link.href = "";
  brand.appendChild(Link);
  let div = document.createElement("div");
  Link.appendChild(div);
  let fig = document.createElement("figure");
  div.appendChild(fig);
  let img = document.createElement("img");
  img.src = src;
  img.alt = alt;
  fig.appendChild(img);
  let figcap = document.createElement("figcaption");
  let comment = document.createElement("span");
  figcap.innerHTML = name;
  comment.className = "comment";
  comment.textContent = cmt;
  let price = document.createElement("span");
  price.className = "price";
  price.textContent = pri;
  fig.appendChild(figcap);
  figcap.appendChild(comment);
  figcap.appendChild(price);
}