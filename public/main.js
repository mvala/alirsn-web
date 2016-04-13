/**
 * Main
 */

var socket = io.connect();

System.config({
    packages: {
        app: {
            format: 'register',
            defaultExtension: 'js'
        }
    }
});
System.import('app/main')
    .then(null, console.error.bind(console));

// json file stored in same folder, absolute address can be used as well
//JSROOT.NewHttpRequest("test/hpx.json", 'object', function(obj) {
//    JSROOT.draw("jsroot-canvas", obj, "hist");
//}).send();


// absolute file path can be used as well
//var filename = "test/RsnOutFolder.root";
//var filename = "http://jsroot.gsi.de/files/hsimple.root";

//JSROOT.OpenFile(filename, function(file) {
//    file.ReadObject("pt/data/results/norm[1.10,1.15]/fit_0[0.997,1.050]/", function(obj) {
//    o = obj.FindObject("hCorrBC");
//    //file.ReadObject("hpx;1", function(obj) {
//        JSROOT.draw("jsroot-canvas", o, "colz");
//    });
//});



function createGUI() {
    var h = new JSROOT.HierarchyPainter("example", "myTreeDiv");

    h.SetDisplay("simple", "fit_draw"); // can be also "grid2x2" or "collapsible" or "tabs"

    // one could use absolute path here like http://jsroot.gsi.de/files/hsimple.root
    //h.OpenRootFile("http://alieos.saske.sk:8000/eos/alike.saske.sk/alice/alike/PWGLF/LF_pp/389_20160307-1141/merge_runlist_4/AnalysisResults.root", function() {
    //h.OpenRootFile("http://disk.saske.sk/mvala/AnalysisResults.root", function() {
    //h.OpenRootFile("test/RsnOutFolder.root", function() {
    //h.OpenRootFile("http://jsroot.gsi.de/files/hsimple.root", function() {
    //    h.display("pt/data/results/norm[1.10,1.15]/fit_0[0.997,1.050]/hCorrBC");
    //h.display("hpx;1", "hist");

    var timeoutBinChanged = 0;
    JSROOT.gStyle.AutoStat = false;
    var optFit = 1111;
    JSROOT.gStyle.StatNDC = {
        fX1NDC: 0.68,
        fY1NDC: 0.65,
        fX2NDC: 0.98,
        fY2NDC: 0.91
    };
    //var fname = "http://disk.saske.sk/mvala/RsnOutFolder.root";
    var fname = "test/RsnOutFolder.root";
    var data = "LHC15f";
    var mc = "LHC15g3a3";
    //var prefix = [ "pt", "p_{T}" ];
    var prefix = ["ctj", "cos(#theta)  Jackson frame"];
    //var prefix = [ "ctt", "cos(#theta)  Transverse frame"];
    var iFit = 6;
    var fitGroup = ["norm[1.10,1.15]/fit_0[0.997,1.050]", "norm[1.10,1.15]/fit_0[0.997,1.130]", "norm[1.10,1.15]/fit_0[1.000,1.080]",
        "norm[1.10,1.15]/fit_1[0.997,1.050]", "norm[1.10,1.15]/fit_1[0.997,1.130]", "norm[1.10,1.15]/fit_1[1.000,1.080]",
        "norm[1.10,1.15]/fit_2[0.997,1.050]", "norm[1.10,1.15]/fit_2[0.997,1.130]", "norm[1.10,1.15]/fit_2[1.000,1.080]",
    ];

    var listData = prefix[0] + "/" + data;
    JSROOT.OpenFile(fname, function(file) {
        file.ReadObject(listData, function(list) {
            //console.log(list);
            h.OpenRootFile(fname, function() {
                var itemname = prefix[0] + "/results/" + data + "_" + mc + "/hist/" + fitGroup[iFit] + "/hCorrBC";
                //console.log(itemname);
                h.get(itemname, function(node, obj) {
                    //console.log(obj);
                    //obj.fLineColor = i + 1;
                    //obj.fMarkerColor = i + 1;
                    obj.fTitle = prefix[1];
                    var painter = JSROOT.redraw('myMainDiv', obj, "");
                    painter.ConfigureUserTooltipCallback(function(info) {
                        if (info == null) {
                            // one could clear previous draw
                            //JSROOT.cleanup("fit_draw");
                            //d3.select("#user_tooltip").html("No tooltip");
                            return;
                        }
                        //console.log(info);
                        JSROOT.cleanup("fit_draw");
                        // set tooltip info
                        //console.log("object " + info.name + "  bin " + info.bin + "  cont " + info.cont);
                        //console.log(obj2.fKeys[info.bin].fName);
                        //var name = prefix + "/" + obj2.fKeys[info.bin].fName + "/" + postfix + "/hSignal;1";
                        var name = prefix[0] + "/" + data + "/" + list.fKeys[info.bin].fName + "/" + fitGroup[iFit] + "/hSignal;1";
                        //console.log(name);
                        h.get(name, function(node3, obj3) {
                            //console.log(obj3);
                            obj3.fTitle = list.fKeys[info.bin].fName;
                            JSROOT.gStyle.OptFit = optFit;
                            JSROOT.gStyle.AutoStat = true;
                            JSROOT.redraw("fit_draw", obj3);
                        });
                    }, timeoutBinChanged);
                });
            });
        });

    });

}
