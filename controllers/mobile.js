var Mobile = require('../models/mobile');

exports.mobile_list = async function (req, res) {
    try {
        tMobiles = await Mobile.find();
        res.send(tMobiles);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

exports.mobile_detail = async function (req, res) {
    console.log("detail" + req.params.id)
    try {
        result = await Mobile.findById(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};

exports.mobile_create_post = async function (req, res) {
    console.log(req.body)
    let document = new Mobile();
    document.mobile_brand = req.body.mobile_brand;
    document.mobile_color = req.body.mobile_color;
    document.mobile_cost = req.body.mobile_cost;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

exports.mobile_delete =async function (req, res) {
    console.log("delete " + req.params.id)
    try {
    result = await Mobile.findByIdAndDelete( req.params.id)
    console.log("Removed " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send('{"error": Error deleting ${err}}');
}
};

exports.mobile_update_put = async function (req, res) {
    console.log(`update on id ${req.params.id} with body
    ${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await Mobile.findById(req.params.id)
        // Do updates of properties
        if (req.body.mobile_brand) toUpdate.mobile_brand = req.body.mobile_brand;
        if (req.body.mobile_cost)  toUpdate.mobile_color = req.body.mobile_color;
        if (req.body.mobile_color) toUpdate.mobile_cost = req.body.mobile_cost;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
    }
};

exports.mobile_view_all_Page = async function (req, res) {
    try {
        tMobiles = await Mobile.find();
        res.render('mobiles', { title: 'Mobiles avialble', results: tMobiles });
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};


exports.mobile_view_one_Page = async function (req, res) {
    console.log("single view for id " + req.query.id)
    try {
        result = await Mobile.findById(req.query.id)
        res.render('mobiledetail',
            { title: 'Mobile Details', toShow: result });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

exports.mobile_create_Page = function (req, res) {
    console.log("create view")
    try {
        res.render('mobilecreate', { title: 'Mobile Create' });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

exports.mobile_update_Page = async function (req, res) {
    console.log("update view for item " + req.query.id)
    try {
        let result = await Mobile.findById(req.query.id)
        res.render('mobileupdate', { title: 'Mobile Update', toShow: result });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};


exports.mobile_delete_Page = async function (req, res) {
    console.log("Delete view for id " + req.query.id)
    try {
        result = await Mobile.findById(req.query.id)
        res.render('mobiledelete', {title: 'Mobile Delete', toShow: result});
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};