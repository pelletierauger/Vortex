drawVert = function(selectedProgram) {
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    /*======== Associating shaders to buffer objects ========*/
    // Bind vertex buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, dotsVBuf);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    // Get the attribute location
    var coord = gl.getAttribLocation(selectedProgram, "vertexID");
    // Point an attribute to the currently bound VBO
    gl.vertexAttribPointer(coord, 1, gl.FLOAT, false, 0, 0);
    // Enable the attribute
    gl.enableVertexAttribArray(coord);

    var time = gl.getUniformLocation(selectedProgram, "time");
    // Point an attribute to the currently bound VBO
    // gl.vertexAttribPointer(coord, 1, gl.FLOAT, false, 0, 0);
    gl.uniform1f(time, drawCount);
    // Enable the attribute
    // gl.enableVertexAttribArray(coord);
    /*============= Drawing the primitive ===============*/
    // // Clear the canvas
    // gl.clearColor(0.5, 0.5, 0.5, 0.9);
    // Clear the color buffer bit
    // gl.clear(gl.COLOR_BUFFER_BIT);
    // Draw the triangle
    gl.drawArrays(gl.POINTS, 0, 500000);
}