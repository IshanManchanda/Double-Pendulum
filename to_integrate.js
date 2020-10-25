
function screen1() {
	stroke(9, 240, 17);
	strokeWeight(5);
	line(40,50,width-40,50);
	line(40,100,width-40,100);
	line(40,150,width-40,150);
	line(40,200,width-40,200);
	line(40,250,width-40,250);
	line(40,300,width-40,300);

	noStroke();
	textFont(createFont("Ravie"),16);
	fill(250, 161, 45);
	rect(ang1+40,50,8,14);
	rect(ang2+40,100,8,14);
	rect(ma1-60,150,8,14);
	rect(ma2-60,200,8,14);
	rect(len1+40,250,8,14);
	rect(len2+40,300,8,14);

	fill(255, 0, 0);
	text("0°",35,76);
	text("360°",width-50,76);
	text("0°",35,126);
	text("360°",width-50,126);
	text("100Px",17,176);
	text("1000Px",width-70,176);
	text("100Px",17,226);
	text("1000Px",width-70,226);
	text("50Px",17,276);
	text("200Px",width-70,276);
	text("50Px",17,326);
	text("200Px",width-70,326);

	//Drawing 'Start Simulation" Button
	fill(0, 255, 204);
	rect(300,500,200,40,90);
	fill(234, 0, 255);
	textSize(16);
	text("Start Simulation",205,505);

	//Logic For Slider Movement And Button Press
	{
		if (mouseX > ang1 + 32 && mouseX < ang1 + 48 && mouseY < 57 && mouseY > 43){
			cursor(HAND);
			if (mouseIsPressed) {
				ang1 = mouseX - 40;
				ang1 = constrain(ang1,0,520);
			}
		}

		else if (mouseX > ang2 + 32 && mouseX < ang2 + 48 && mouseY < 107 && mouseY > 93){
			cursor(HAND);
			if (mouseIsPressed) {
				ang2 = mouseX - 40;
				ang2 = constrain(ang2,0,520);
			}
		}

		else if (mouseX > ma1 - 68 && mouseX < ma1 - 52 && mouseY < 157 && mouseY > 143){
			cursor(HAND);
			if (mouseIsPressed) {
				ma1 = mouseX + 60;
				ma1 = constrain(ma1,100,620);
			}
		}

		else if (mouseX > ma2 - 68 && mouseX < ma2 - 52 && mouseY < 207 && mouseY > 193){
			cursor(HAND);
			if (mouseIsPressed) {
				ma2 = mouseX + 60;
				ma2 = constrain(ma2,100,620);
			}
		}

		else if (mouseX > len1 + 32 && mouseX < len1 + 48 && mouseY < 257 && mouseY > 243){
			cursor(HAND);
			if (mouseIsPressed) {
				len1 = mouseX - 40;
				len1 = constrain(len1,0,520);
			}
		}

		else if (mouseX > len2 + 32 && mouseX < len2 + 48 && mouseY < 307 && mouseY > 293){
			cursor(HAND);
			if (mouseIsPressed) {
				len2 = mouseX - 40;
				len2 = constrain(len2,0,520);
			}
		}

		else if (mouseX > 205 && mouseX < 395 && mouseY > 480 && mouseY < 520) {
			cursor(HAND);
			mouseReleased = function() {
				if ((mouseX > 205 && mouseX < 395 && mouseY > 480 && mouseY < 520) && Screen === 1) {
					startSim(ma1,ma2,ang1,ang2,len1,len2);
				}
			};
		}

		else {
			cursor();
		}
	}
}
