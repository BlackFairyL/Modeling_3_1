let canvas, ctx;
let STEP_T = 0.01;
let m = 0, c = 0, k = 0, A = 0;

// Note: ось y направлена вниз в canvas
let init_coordinate_x, init_coordinate_y;
const SPACER = 20;

// Счетчик времени
let time_counter = 0;

let array_of_objects = [];

function init() {
    // Инициализация canvas
    canvas = document.getElementById("canvas_id");
    ctx    = canvas.getContext('2d');
    init_coordinate_x = 2 * SPACER;
    init_coordinate_y = SPACER;


    draw();
    draw_axis();

}


function clear_all() {
    ctx.save();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
}
function draw_axis() {
    ctx.save();

    // Угол под которым будут направлены линии стрелок
    let delta_a = 10;
    let delta_b = 30;

    // Отрисовка прямых линий
    ctx.beginPath();

    // Ось t
    let heightT = canvas.height - SPACER * 2;
    ctx.moveTo(init_coordinate_x, heightT / 2);
    ctx.lineTo(canvas.width - 2 * SPACER, heightT / 2);

    // Стрелки
    ctx.lineTo(canvas.width - 2 * SPACER - delta_b, heightT / 2 - delta_a);
    ctx.moveTo(canvas.width - 2 * SPACER, heightT / 2);
    ctx.lineTo(canvas.width - 2 * SPACER - delta_b, heightT / 2 + delta_a);
    ctx.moveTo(canvas.width - 2 * SPACER, heightT / 2);

    // Название
    ctx.save();
    ctx.font = '20px serif';
    ctx.fillText("t с", canvas.width - SPACER, canvas.height / 2 - SPACER);
    ctx.restore();

    // Ось x
    ctx.moveTo(init_coordinate_x, init_coordinate_y);
    ctx.lineTo(init_coordinate_x, canvas.height - 2 * SPACER);

    // Стрелки
    ctx.moveTo(init_coordinate_x, init_coordinate_y);
    ctx.lineTo(init_coordinate_x + delta_a, init_coordinate_y + delta_b);
    ctx.moveTo(init_coordinate_x, init_coordinate_y);
    ctx.lineTo(init_coordinate_x - delta_a, init_coordinate_y + delta_b);
    ctx.moveTo(init_coordinate_x, init_coordinate_y - delta_b);

    // Название
    ctx.save();
    ctx.font = '20px serif';
    ctx.fillText("x", SPACER - 10, init_coordinate_y);
    ctx.restore();



    ctx.save();
    // черточки X
    let coeff = 40;
    //heightT -= coeff * 2;
    for(let i = -5; i <= 5; i++){
        ctx.moveTo(init_coordinate_x, heightT / 2 - i * coeff);

        ctx.lineTo(init_coordinate_x + delta_a, heightT  / 2 - i * coeff);
        ctx.save();
        ctx.font = '15px serif';

        ctx.fillText(String(i / 10.), init_coordinate_x - 30 , heightT / 2 - i * coeff);
        ctx.restore();
    }

    //heightT += coeff * 2;
    ctx.save();
    // черточки T
    let coeffT = 40;
    for(let i = 0; i <= 10; i++){
        ctx.moveTo(init_coordinate_x + i * coeffT, heightT / 2);

        ctx.lineTo(init_coordinate_x + i * coeffT, heightT / 2 + delta_a );
        ctx.save();
        ctx.font = '15px serif';

        ctx.fillText(String(i), init_coordinate_x + i * coeffT , heightT / 2 + 30 );
        ctx.restore();
    }
    ctx.restore();

    ctx.stroke();

    ctx.restore();
}

function check_value() {
    k = parseFloat(document.getElementById("input_k").value);
    if (k <= 0 || isNaN(k)) {
        k = 0.01;
        document.getElementById("input_k").value = 0.01;
    }

    c = parseFloat(document.getElementById("input_c").value);
    if (c <= 0 || isNaN(c)) {
        c = 0.01;
        document.getElementById("input_c").value = 0.01;
    }

    m = parseFloat(document.getElementById("input_weight").value);
    if (m <= 0 || isNaN(m)) {
        m = 0.1;
        document.getElementById("input_weight").value = 0.1;
    }

    A = parseFloat(document.getElementById("input_A").value);
    if (A <= 0 || isNaN(A)) {
        A = 0.01;
        document.getElementById("input_A").value = 0.01;
    }
}

function draw_figure() {
    let t = 0;
    let w0 = k / m;
    let b = c / (2 * m);
    let w = Math.sqrt(w0 * w0 - b * b);
    let A0 = A * Math.pow(Math.E, -b*t);
    ctx.beginPath();
    let prev_x = init_coordinate_x,  prev_x1 = init_coordinate_x;
    let prev_y = (canvas.height - SPACER * 2) / 2, prev_y1 = (canvas.height - SPACER * 2) / 2 ;
    console.log(A0);
    console.log((40 * A0 / 0.1) / 2);
    ctx.moveTo(prev_x, prev_y);
    console.log(prev_x);
    console.log(prev_y);
    while (t <= 1){
        console.log(prev_x);
        console.log(prev_y);
        t = t + 0.001;
        let x = A * Math.pow(Math.E, -b*t) ;
        if (!isNaN(w))
            x = x * Math.cos(w * t);
        ctx.beginPath();
        ctx.moveTo(prev_x1, prev_y1);
        ctx.lineTo(prev_x + 400 * t, prev_y + x * 400);
        ctx.stroke();
        ctx.closePath();
        prev_x1 = prev_x + t * 400;
        prev_y1 = prev_y + x * 400;

    }


}
function draw() {
    clear_all();
    draw_axis();
    check_value();
    draw_figure();
}
