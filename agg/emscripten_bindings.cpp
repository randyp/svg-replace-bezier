#include <emscripten/bind.h>
#include "agg_curves.h"

using namespace emscripten;

EMSCRIPTEN_BINDINGS(agg_curves) {
    enum_<agg::path_commands_e>("PathCommand")
        .value("stop", agg::path_cmd_stop)
        .value("move_to", agg::path_cmd_move_to)
        .value("line_to", agg::path_cmd_line_to)
        .value("curve3", agg::path_cmd_curve3)
        .value("curve4", agg::path_cmd_curve4)
        .value("curveN", agg::path_cmd_curveN)
        .value("catrom", agg::path_cmd_catrom)
        .value("ubspline", agg::path_cmd_ubspline)
        .value("end_poly", agg::path_cmd_end_poly)
        .value("mask", agg::path_cmd_mask);
    
    class_<agg::curve3>("curve3")
        .constructor<>()
        .function("init", static_cast<void (agg::curve3::*)(double,double,double,double,double,double)>(&agg::curve3::init))
        .function("reset", &agg::curve3::reset)
        .function("angleTolerance", static_cast<void (agg::curve3::*)(double)>(&agg::curve3::angle_tolerance))
        .function("cuspLimit", static_cast<void (agg::curve3::*)(double)>(&agg::curve3::cusp_limit))
        .function("approximationScale", static_cast<void (agg::curve3::*)(double)>(&agg::curve3::approximation_scale))
        .function("vertex", static_cast<unsigned (agg::curve3::*)(unsigned long, unsigned long)>(&agg::curve3::vertex))
        ;
           
    class_<agg::curve4>("curve4")
        .constructor<>()
        .function("init", static_cast<void (agg::curve4::*)(double,double,double,double,double,double,double,double)>(&agg::curve4::init))
        .function("reset", &agg::curve4::reset)
        .function("angleTolerance", static_cast<void (agg::curve4::*)(double)>(&agg::curve4::angle_tolerance))
        .function("cuspLimit", static_cast<void (agg::curve4::*)(double)>(&agg::curve4::cusp_limit))
        .function("approximationScale", static_cast<void (agg::curve4::*)(double)>(&agg::curve4::approximation_scale))
        .function("vertex", static_cast<unsigned (agg::curve4::*)(unsigned long, unsigned long)>(&agg::curve4::vertex))
        ;
}
