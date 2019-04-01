<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * This file defines the admin settings for this plugin
 *
 * @package   atto_dictator
 * @copyright 2018 Justin Hunt {@link http://www.poodll.com}
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */


use atto_dictator\constants;
use atto_dictator\utils;

if ($ADMIN->fulltree) {

    $settings->add(new admin_setting_configtext(constants::M_COMPONENT . '/apiuser',
        get_string('apiuser', constants::M_COMPONENT), get_string('apiuser_details', constants::M_COMPONENT),
        '', PARAM_TEXT));
    $tokeninfo =   utils::fetch_token_for_display(get_config(constants::M_COMPONENT,'apiuser'),get_config(constants::M_COMPONENT,'apisecret'));
//get_string('apisecret_details', constants::M_COMPONENT)
    $settings->add(new admin_setting_configtext(constants::M_COMPONENT . '/apisecret',
        get_string('apisecret', constants::M_COMPONENT), $tokeninfo,
        '', PARAM_TEXT));

    $regions = utils::get_region_options();
    $settings->add(new admin_setting_configselect(constants::M_COMPONENT . '/awsregion', get_string('awsregion', constants::M_COMPONENT),
        '', constants::REGION_USEAST1, $regions));

    $langoptions = utils::get_lang_options();
    $settings->add(new admin_setting_configselect(constants::M_COMPONENT . '/language', get_string('language', constants::M_COMPONENT),
        '', constants::LANG_ENUS, $langoptions));

    $skinoptions = utils::fetch_options_skins();
    unset($skinoptions[constants::SKIN_ONCE]);
    $settings->add(new admin_setting_configselect(constants::M_COMPONENT . '/audioskin', get_string('audioskin', constants::M_COMPONENT),
        '', constants::SKIN_FRESH, $skinoptions));
}
