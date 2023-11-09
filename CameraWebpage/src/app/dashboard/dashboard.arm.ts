import { CanvasImage } from './dashboard.canvasimage';

function clamp(value : number,bottom : number, top : number) : number {
  if (value > top) { value = top; }
  else if (value < bottom) { value = bottom; }
  return value;
}

export class Arm {
  armTopImg : CanvasImage = new CanvasImage("assets/arm_top.png");
  context : CanvasRenderingContext2D | undefined;

  shoulder_rotatation : number = 0;
  shoulder_angle : number = 0;
  elbow_angle : number = 0;
  wrist_rotation : number = 0;
  wrist_angle : number = 0;
  claw_closure : number = 0;

  constructor() {}

  update() : void {
    if (this.context === undefined) { return; }
    
    this.context.clearRect(0, 0, 300, 300);
    this.get();
    
    var baseX = 150;
    var baseY = 120;
    var humerusLength = 50
    var overallShoulderAngle = this.shoulder_angle + 90;
    var elbowX = baseX - humerusLength * Math.cos(overallShoulderAngle * Math.PI / 180);
    var elbowY = baseY - humerusLength * Math.sin(overallShoulderAngle * Math.PI / 180);
    var forearmLength = 35
    var overallElbowAngle = this.elbow_angle + overallShoulderAngle;
    var wristX = elbowX - forearmLength * Math.cos(overallElbowAngle * Math.PI / 180);
    var wristY = elbowY - forearmLength * Math.sin(overallElbowAngle * Math.PI / 180);
    var clawLength = 20;
    var overallWristAngle = this.wrist_angle + overallElbowAngle;
    var leftClawX = wristX - clawLength * Math.cos((overallWristAngle - (1 - this.claw_closure) * 20) * Math.PI / 180);
    var leftClawY = wristY - clawLength * Math.sin((overallWristAngle - (1 - this.claw_closure) * 20) * Math.PI / 180);
    var rigthClawX = wristX - clawLength * Math.cos((overallWristAngle + (1 - this.claw_closure) * 20) * Math.PI / 180);
    var rigthClawY = wristY - clawLength * Math.sin((overallWristAngle + (1 - this.claw_closure) * 20) * Math.PI / 180);


    this.armTopImg.drawRotated(this.context, 150, 240, -this.shoulder_rotatation, 0.09);

    // Humerus
    this.drawLine(baseX, baseY, elbowX, elbowY, 10, "#000000");
    this.drawLine(baseX, baseY, elbowX, elbowY, 6, "#CAD0D7");

    // Forearm
    this.drawLine(elbowX, elbowY, wristX, wristY, 10, "#000000");
    this.drawLine(elbowX, elbowY, wristX, wristY, 6, "#CAD0D7");

    // Claw
    this.drawLine(wristX, wristY, leftClawX, leftClawY, 4, "#000000");
    this.drawLine(wristX, wristY, leftClawX, leftClawY, 1, "#CAD0D7");
    this.drawLine(wristX, wristY, rigthClawX, rigthClawY, 4, "#000000");
    this.drawLine(wristX, wristY, rigthClawX, rigthClawY, 1, "#CAD0D7");
    

    // Base
    this.drawRectangle(baseX - 14, baseY, 28, 18, "#000000");
    this.drawCircle(baseX, baseY, 14, "#000000");
    this.drawCircle(baseX, baseY, 12, "#CAD0D7");
    this.drawCircle(baseX, baseY, 7, "#000000");
    this.drawCircle(baseX, baseY, 5, "#A9B0BB");

    // Elbow
    this.drawCircle(elbowX, elbowY, 8, "#000000");
    this.drawCircle(elbowX, elbowY, 6, "#CAD0D7");
    this.drawCircle(elbowX, elbowY, 4, "#000000");
    this.drawCircle(elbowX, elbowY, 2, "#A9B0BB");

    // Wrist
    this.drawCircle(wristX, wristY, 8, "#000000");
    this.drawCircle(wristX, wristY, 6, "#CAD0D7");
    this.drawCircle(wristX, wristY, 4, "#000000");
    this.drawCircle(wristX, wristY, 2, "#A9B0BB");

  }

  get() : void {
    this.shoulder_rotatation += Math.random() * 20 - 10;
    this.shoulder_angle += Math.random() * 20 - 10;
    this.elbow_angle += Math.random() * 20 - 10;
    this.wrist_rotation += Math.random() * 20 - 10;
    this.wrist_angle += Math.random() * 20 - 10;
    this.claw_closure += Math.random() * 0.2 - 0.1;

    this.shoulder_rotatation = clamp(this.shoulder_rotatation, -135, 135);
    this.shoulder_angle = clamp(this.shoulder_angle, -90, 90);
    this.elbow_angle = clamp(this.elbow_angle, -135, 135);
    this.wrist_angle = clamp(this.wrist_angle, -135, 135);
    this.claw_closure = clamp(this.claw_closure, 0, 1);
  }

  drawCircle(centerX : number, centerY : number, radius : number, color : string) : void {
    if (this.context === undefined) { return; }

    this.context.beginPath();
    this.context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    this.context.fillStyle = color;
    this.context.fill();
  }

  drawRectangle(x : number, y : number, width : number, height : number, color : string) : void {
    if (this.context === undefined) { return; }

    this.context.beginPath();
    this.context.rect(x, y, width, height);
    this.context.fillStyle = color;
    this.context.fill();
  }

  drawLine(startX : number, startY : number, endX : number, endY : number, width : number, color : string) : void {
    if (this.context === undefined) { return; }

    this.context.beginPath();
    this.context.moveTo(startX, startY);
    this.context.strokeStyle = color;
    this.context.lineWidth = width;
    this.context.lineTo(endX, endY);
    this.context.stroke()
  }
}