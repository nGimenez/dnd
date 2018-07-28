

var panel = {};
function initPanel(){
    panel.x = 100;
    panel.y = 100;
    panel.testSlider = createSlider(0, 255, 100);
    panel.testSlider.position(20 + panel.x, 20 + panel.y);

    panel.sliderLabel = createP('Nice Label');
    panel.sliderLabel.position(20 + panel.x, 50 + panel.y);
}

function movePanel(pos){
    panel.x = pos.x;
    panel.y = pos.y;
    panel.testSlider.position(20 + panel.x, 20 + panel.y);
    panel.sliderLabel.position(20 + panel.x, 50 + panel.y);
}

//var newWind = window.open('controlPanel.html', 'controlPanel');