let start_btn = document.getElementById("start_btn");
let go_btn = document.getElementById("go_btn");
let input_name = document.getElementById("input_name");
start_btn.addEventListener("click", () => {
  input_name.style.display = "block";
  go_btn.style.display = "block";
  start_btn.style.display = "none";
});
let user_name = document.querySelector("#user_name");
go_btn.addEventListener("click", () => {
  if (isNaN(input_name.value)) {
    // al check dah bedy true lw asmo bad2 be 7rd mesh rgm
    user_name.innerHTML = input_name.value;
    document.querySelector(".controll_buttons").style.display = "none";
  } else {
    document.querySelector("#warning").style.display = "block";
    setTimeout(() => {
      document.querySelector("#warning").style.display = "none";
    }, 2000);
  }
});
let duration = 1000; // deh aly hya 1 sec aly hst5dmha
let block_container = document.querySelector(".memory_game_blocks");
let blocks = Array.from(block_container.children); //array.form deh bt7oy aly gwaha fe arr aly homa al div aly gwa al container al kber w h5znhom fe var asmo blocks
console.log(blocks);
let order_range = [...Array(blocks.length).keys()]; //blocks.length = 20 aly homa al swr bt3ty  .keys aly homa al index aly mn 1 le 19 w ... y7otly kol dol fe array gwa var asmo order_range
//Array( 50 ) kda b2olo a3mly arr be size 50 3onsr gwaha
console.log(order_range); // = 0 : 19
//h3ml order css prop 3lahom
shuffle_arr(order_range); //kda khlet al order b2a random
console.log(order_range);
blocks.forEach((block, i) => {
  block.style.order = order_range[i];
  block.addEventListener("click", () => {
    // for each htm4y 3la 3onsr 3onsr w tdelo al event dah
    flib_block(block);
  });
});
function shuffle_arr(arr) {
  // arr = 0 : 19
  let current_index = arr.length; // = 20
  let random_index;
  let temp;
  while (current_index > 0) {
    random_index = Math.floor(Math.random() * current_index); //le al current index = 5 fa hya htl3 mn 0 le 5 maximum
    current_index--;
    temp = arr[current_index]; // temp = al index
    arr[current_index] = arr[random_index]; // w al index al2adem = al new index
    arr[random_index] = temp; // w alindex al gded = al index al 2adem
    // ya3ny b3ml swap le al index 34an al index mn 0:19 zy al array blzbt
  }
  return arr;
}
// flipBack function
function flib_block(selected_block) {
  selected_block.classList.add("is_flipped");
  //total_num_filpped deh htb2a array feha al blocks aly 3ndha class asmo is_flipped
  let total_num_filpped = blocks.filter((e) => {
    return e.classList.contains("is_flipped");
  });
  if (total_num_filpped.length == 2) {
    console.log("hi 2");
    // stop clicking function
    stop_clicking();
    // check matched block function
    check_matched_block(total_num_filpped[0], total_num_filpped[1]);
  }
}
function stop_clicking() {
  block_container.classList.add("no_clicking");
  setTimeout(() => {
    // remove class "no_clicking"
    block_container.classList.remove("no_clicking");
  }, duration);
}
function check_matched_block(first_block, second_block) {
  let tries_count = document.querySelector(".tries span");
  if (
    //lw true yb2a alsorten zy b3d
    first_block.getAttribute("sa7b_alsora") ===
    second_block.getAttribute("sa7b_alsora")
  ) {
    //sa7b_alsora aly hya al custom attribute aly ana 7to be al html
    first_block.classList.remove("is_flipped");
    second_block.classList.remove("is_flipped");
    // 3mltlo remove 34an fe al function aly asmha flib_block deh bt3d kol aly 3lahom class is_fliiped w ana m4 3ayz kda
    first_block.classList.add("has_matched");
    second_block.classList.add("has_matched");
    // khlet al class has_matched leh nfs al css prop zy al is_flipped
    document.getElementById("success").play();
  } else {
    tries_count.innerHTML -= -1;
    setTimeout(() => {
      first_block.classList.remove("is_flipped");
      second_block.classList.remove("is_flipped");
    }, duration);
    document.getElementById("fail").play();
  }
}
