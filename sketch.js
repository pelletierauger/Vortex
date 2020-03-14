let looping = true;
let keysActive = true;
let socket, cnvs, ctx, canvasDOM;
let fileName = "./frames/alligator/alligator";
let maxFrames = 15000;
let gl;
let time;
let positive = true;
let intensity;
let drawCount = 1110;
drawCount = 125000;
let drawIncrement = 1;
let vertexBuffer;
let vertices = [];
const seed = 10;
// const openSimplex = openSimplexNoise(seed);
let mS = 1;
let amountOfScratches = 3;
let fluctuation = 1;
let namedPrograms = {};

// a shader variable
let texcoordShader;
let dotsVBuf, bgVBuf;
let texture, texture2, framebuf, framebuf2;
let vb;
vertices = [];
for (let i = 0; i < 1000000; i++) {
    vertices.push(i);
}
vertices = new Float32Array(vertices);
let currentSceneIndex;

function setup() {
    // socket = io.connect('http://localhost:8080');
    // socket.on('receiveOSC', receiveOSC);
    pixelDensity(1);
    cnvs = createCanvas(1280, 720, WEBGL);
    canvasDOM = document.getElementById('defaultCanvas0');
    // canvasDOM.style.maxWidth = "1280px";
    // canvasDOM.style.maxHeight = "100%";
    // canvasDOM.style.width = "100%";
    canvasDOM.style.width = windowWidth + "px";
    canvasDOM.style.height = windowWidth * 9 / 16 + "px";
    // noCanvas();
    // cnvs = document.getElementById('my_Canvas');
    gl = canvas.getContext('webgl');
    // canvasDOM = document.getElementById('my_Canvas');
    // canvasDOM = document.getElementById('defaultCanvas0');
    // gl = canvasDOM.getContext('webgl');
    // gl = cnvs.drawingContext;

    // gl = canvasDOM.getContext('webgl', { premultipliedAlpha: false });



    // gl.colorMask(false, false, false, true);
    // gl.colorMask(false, false, false, true);

    // Clear the canvas
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // Enable the depth test
    gl.enable(gl.DEPTH_TEST);
    gl.depthMask(false);

    // Clear the color buffer bit
    gl.clear(gl.COLOR_BUFFER_BIT);
    // gl.colorMask(true, true, true, true);
    // gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    // gl.blendFunc(gl.SRC_ALPHA, gl.DST_ALPHA);
    // gl.blendFunc(gl.SRC_ALPHA, gl.DST_ALPHA);
    // Set the view port
    gl.viewport(0, 0, cnvs.width * 1, cnvs.height * 1);
    frameRate(20);
    // background(0);
    // fill(255, 50);
    noStroke();
    vertex_buffer = gl.createBuffer();
    dotsVBuf = gl.createBuffer();
    bgVBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    if (!looping) {
        noLoop();
    }
    shadersReadyToInitiate = true;
    initializeShaders();
    // createWhiteDots();
    time = gl.getUniformLocation(getProgram("pulsar-fog"), "time");
    texture = createTexture();
    framebuf = createFrameBuffer(texture);
    texture2 = createTexture();
    framebuf2 = createFrameBuffer(texture2);
    currentScene = (getProgram(GET["scene"])) ? GET["scene"] : "green-vortex";
    for (let i = 0; i < scenes.length; i++) {
        if (scenes[i].name === currentScene) {
            currentSceneIndex = i;
        }
    }
}

draw = function() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    // We bind the framebuffer...
    bindFrameBuffer(texture, framebuf);
    gl.viewport(0, 0, 1280, 720);

    // draw the scene, presumably on a framebuffer
    let currentProgram = getProgram("pulsar-fog");
    gl.useProgram(currentProgram);
    drawBG(currentProgram);
    currentProgram = getProgram(currentScene);
    gl.useProgram(currentProgram);
    drawVert(currentProgram);
    // drawSwirl(currentProgram);
    // drawPulsar(currentProgram);

    // vb = map(cos(frameCount * 0.01), -1, 1, 0, 4);

    // // Here, the original image should be redrawned
    // // from "texture" to "texture2"

    // let processProgram = getProgram("process");
    // // console.log(processProgram);
    // gl.useProgram(processProgram);



    // let aspect = cnvs.width / cnvs.height;
    // let vertices = new Float32Array([-1, 1, 1, 1, 1, -1, // Triangle 1
    //     -1, 1, 1, -1, -1, -1 // Triangle 2
    // ]);
    // let vbuffer = gl.createBuffer();
    // gl.bindBuffer(gl.ARRAY_BUFFER, vbuffer);
    // gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    // let itemSize = 2;
    // let numItems = vertices.length / itemSize;
    // processProgram.aVertexPosition = gl.getAttribLocation(processProgram, "a_position");
    // gl.enableVertexAttribArray(processProgram.aVertexPosition);
    // gl.vertexAttribPointer(processProgram.aVertexPosition, itemSize, gl.FLOAT, false, 0, 0);




    // var resolutionLocation = gl.getUniformLocation(processProgram, "u_resolution");
    // var textureSizeLocation = gl.getUniformLocation(processProgram, "u_textureSize");
    // var kernelLocation = gl.getUniformLocation(processProgram, "u_kernel[0]");
    // var kernelWeightLocation = gl.getUniformLocation(processProgram, "u_kernelWeight");
    // var flipYLocation = gl.getUniformLocation(processProgram, "u_flipY");

    // var directionLocation = gl.getUniformLocation(processProgram, "direction");

    // gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    // bindFrameBuffer(texture2, framebuf2);
    // gl.viewport(0, 0, 1280, 720);
    // gl.bindTexture(gl.TEXTURE_2D, texture);

    // let name = "myBlur";
    // gl.uniform2f(resolutionLocation, 1280, 720);
    // gl.uniform2f(textureSizeLocation, 1280, 720);
    // gl.uniform2f(directionLocation, 8 * vb, 0);
    // gl.uniform1f(flipYLocation, 1);
    // gl.uniform1fv(kernelLocation, kernels[name]);
    // gl.uniform1f(kernelWeightLocation, computeKernelWeight(kernels[name]));



    // // shader.uniforms.direction = i % 2 === 0 ? [radius, 0] : [0, radius]



    // var textureLocation = gl.getUniformLocation(processProgram, "u_texture");
    // gl.uniform1i(textureLocation, 0);
    // var texcoordLocation = gl.getAttribLocation(processProgram, "a_texcoord");
    // gl.enableVertexAttribArray(texcoordLocation);

    // // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    // var size = 2; // 2 components per iteration
    // var type = gl.FLOAT; // the data is 32bit floats
    // var normalize = false; // don't normalize the data
    // var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
    // var offset = 0; // start at the beginning of the buffer
    // gl.vertexAttribPointer(texcoordLocation, size, type, normalize, stride, offset);




    // // Draw the rectangle.
    // gl.drawArrays(gl.TRIANGLES, 0, 6);



    // gl.uniform2f(directionLocation, 0, 7 * vb);

    // bindFrameBuffer(texture, framebuf);
    // gl.bindTexture(gl.TEXTURE_2D, texture2);
    // gl.drawArrays(gl.TRIANGLES, 0, 6);


    // gl.uniform2f(directionLocation, 6 * vb, 0);

    // bindFrameBuffer(texture2, framebuf2);
    // gl.bindTexture(gl.TEXTURE_2D, texture);
    // gl.drawArrays(gl.TRIANGLES, 0, 6);


    // gl.uniform2f(directionLocation, 0, 5 * vb);
    // bindFrameBuffer(texture, framebuf);
    // gl.bindTexture(gl.TEXTURE_2D, texture2);
    // gl.drawArrays(gl.TRIANGLES, 0, 6);


    // gl.uniform2f(directionLocation, 4 * vb, 0);
    // bindFrameBuffer(texture2, framebuf2);
    // gl.bindTexture(gl.TEXTURE_2D, texture);
    // gl.drawArrays(gl.TRIANGLES, 0, 6);

    // gl.uniform2f(directionLocation, 0, 3 * vb);

    // bindFrameBuffer(texture, framebuf);
    // gl.bindTexture(gl.TEXTURE_2D, texture2);
    // gl.drawArrays(gl.TRIANGLES, 0, 6);


    // gl.uniform2f(directionLocation, 2 * vb, 0);

    // bindFrameBuffer(texture2, framebuf2);
    // gl.bindTexture(gl.TEXTURE_2D, texture);
    // gl.drawArrays(gl.TRIANGLES, 0, 6);

    // gl.uniform2f(directionLocation, 0, 1 * vb);

    // bindFrameBuffer(texture, framebuf);
    // gl.bindTexture(gl.TEXTURE_2D, texture2);
    // gl.drawArrays(gl.TRIANGLES, 0, 6);

    // gl.uniform2f(directionLocation, 1 * vb, 0);

    // bindFrameBuffer(texture2, framebuf2);
    // gl.bindTexture(gl.TEXTURE_2D, texture);
    // gl.drawArrays(gl.TRIANGLES, 0, 6);


    // // bindFrameBuffer(texture, framebuf);
    // // gl.bindTexture(gl.TEXTURE_2D, texture2);
    // // gl.drawArrays(gl.TRIANGLES, 0, 6);

    // // bindFrameBuffer(texture2, framebuf2);
    // // gl.bindTexture(gl.TEXTURE_2D, texture);
    // // gl.drawArrays(gl.TRIANGLES, 0, 6);


    // currentProgram = getProgram("new-flickering-dots");
    // gl.useProgram(currentProgram);
    // // drawAlligatorQuiet(currentProgram);
    // // drawSwirl(currentProgram);
    // drawPulsar(currentProgram);


    // unbind the buffer and draw the resulting texture....
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, 1280, 720);

    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.clearColor(0.5, 0.5, 0.5, 1); // clear to white

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var textureShader = getProgram("textu");
    gl.useProgram(textureShader);

    aspect = cnvs.width / cnvs.height;
    let vertices = new Float32Array([-1, 1, 1, 1, 1, -1, // Triangle 1
        -1, 1, 1, -1, -1, -1 // Triangle 2
    ]);
    vbuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    itemSize = 2;
    numItems = vertices.length / itemSize;
    textureShader.aVertexPosition = gl.getAttribLocation(textureShader, "a_position");
    gl.enableVertexAttribArray(textureShader.aVertexPosition);
    gl.vertexAttribPointer(textureShader.aVertexPosition, itemSize, gl.FLOAT, false, 0, 0);

    var textureLocation = gl.getUniformLocation(textureShader, "u_texture");
    gl.uniform1i(textureLocation, 0);
    var timeLocation = gl.getUniformLocation(textureShader, "time");
    gl.uniform1f(timeLocation, frameCount * 0.01);

    var texcoordLocation = gl.getAttribLocation(textureShader, "a_texcoord");
    gl.enableVertexAttribArray(texcoordLocation);

    // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2; // 2 components per iteration
    var type = gl.FLOAT; // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0; // start at the beginning of the buffer
    gl.vertexAttribPointer(texcoordLocation, size, type, normalize, stride, offset);

    gl.drawArrays(gl.TRIANGLES, 0, numItems);

    drawCount += drawIncrement;
    // if (exporting && frameCount < maxFrames && drawCount > 1113) {
    // if (exporting && frameCount < maxFrames && drawCount > 1449) {
    //     frameExport();
    // }
}

function keyPressed() {
    if (keysActive) {
        if (keyCode === 32) {
            if (looping) {
                noLoop();
                looping = false;
            } else {
                loop();
                looping = true;
            }
        }
        if (key == 'r' || key == 'R') {
            window.location.reload();
        }
        if (key == 'm' || key == 'M') {
            redraw();
        }
        if (key == 't' || key == 'T') {
            incrementScene();
        }
    }
}

function mouseClicked() {
    incrementScene();
}

function incrementScene() {
    if (currentSceneIndex == scenes.length - 1) {
        currentSceneIndex = 0;
    } else {
        currentSceneIndex++;
    }
    currentScene = scenes[currentSceneIndex].name;
}

function windowResized() {
    canvasDOM.style.width = windowWidth + "px";
    canvasDOM.style.height = windowWidth * 9 / 16 + "px";
}