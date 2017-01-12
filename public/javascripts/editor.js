function CodeEditor(textArea) {
    this.textArea = textArea;
}

CodeEditor.prototype.init = function () {
    var editor = CodeMirror.fromTextArea(this.textArea, {
        lineNumbers: true
    });

    var socket = io('http://localhost:3000');
    socket.on('doc', function (data) {
        editor.setValue(data.str);
        window.cmclient = new ot.EditorClient(
            data.revision,
            data.clients,
            new ot.SocketIOAdapter(socket),
            new ot.CodeMirrorAdapter(editor)
        );
    });
};


