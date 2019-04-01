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
 * Strings for component 'atto_dictator', language 'en'.
 *
 * @package    atto_dictator
 * @copyright  2018 Justin Hunt <justin@poodll.com,>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

$string['pluginname'] = 'Poodll Dictator';
$string['privacy:metadata:dictatorcom'] = 'The atto_dictator plugin stores recordings in AWS S3 buckets via cloud.poodll.com.';
$string['privacy:metadata:dictatorcom:userid'] = 'The atto_dictator plugin includes the moodle userid in the urls of recordings.';

$string['dictator'] = 'Poodll Dictator';
$string['recorder'] = 'Recorder Type';
$string['recorderaudio'] = 'Audio Recorder';



$string['apiuser']='Poodll API User ';
$string['apiuser_details']='The Poodll account username that authorises Poodll on this site.';
$string['apisecret']='Poodll API Secret ';
$string['apisecret_details']='The Poodll API secret. See <a href= "https://support.poodll.com/support/solutions/articles/19000083076-cloud-poodll-api-secret">here</a> for more details';

$string['language']='Transcription language';
$string['speakerlanguage']='Speaker language';
$string['en-us']='English(US)';
$string['en-au']='English(AU)';
$string['en-uk']='English(UK)';
$string['es-us']='Spanish(US)';
$string['fr-ca']='French(CA)';
$string['fr-fr']='French(FR)';
$string['pt-br']='Portuguese(BR)';
$string['it-it']='Italian(IT)';

$string['upload']='Upload';
$string['audio']='Audio';
$string['audio_desc']='Audio recorder';
$string['video']='Video';
$string['video_desc']='Video recorder';
$string['insert']='Insert';
$string['cancel']='Cancel';
$string['createaudio']='Dictation';

$string['useast1']='US East';
$string['tokyo']='Tokyo, Japan (no subtitling)';
$string['sydney']='Sydney, Australia';
$string['dublin']='Dublin, Ireland';
$string['ottawa']='Ottawa, Canada (slow)';
$string['frankfurt']='Frankfurt, Germany (slow, no subtitling)';
$string['london']='London, U.K (slow, no subtitling)';
$string['saopaulo']='Sao Paulo, Brazil (slow, no subtitling)';
$string['forever']='Never expire';
$string['awsregion']='AWS Region';
$string['region']='AWS Region';
$string['expiredays']='Days to keep file';
$string['audioskin']='Audio recorder';
$string['videoskin']='Video recorder';


$string['timelimit'] = 'Recording Time Limit';
$string['currentsubmission'] = 'Current Submission:';
$string['yes'] = 'yes';
$string['no'] = 'no';

$string['enableaudio'] = 'Enable audio recording';
$string['enablevideo'] = 'Enable video recording';

$string['recordertype'] = 'Recorder Type';
$string['recorderskin'] = 'Recorder Skin';
$string['skinplain'] = 'Plain';
$string['skinbmr'] = 'Burnt Rose';
$string['skinfresh'] = 'Fresh';
$string['skin123'] = 'One Two Three';
$string['skinonce'] = 'Once';


$string['dictator:allowaudio'] = 'Allow Audio Recording';
$string['dictator:allowvideo'] = 'Allow Video Recording';
$string['dictator:allowupload'] = 'Allow Upload';
$string['dictator:allowsubtitling'] = 'Allow Subtitling';
$string['dictator:visible'] = 'Visible';

$string['displaysubs'] = '{$a->subscriptionname} : expires {$a->expiredate}';
$string['noapiuser'] = "No API user entered. Read Aloud will not work correctly.";
$string['noapisecret'] = "No API secret entered. Read Aloud will not work correctly.";
$string['credentialsinvalid'] = "The API user and secret entered could not be used to get access. Please check them.";
$string['appauthorised']= "Atto Dictator is authorised for this site.";
$string['appnotauthorised']= "Atto Dictator  is NOT authorised for this site.";
$string['refreshtoken']= "Refresh license information";
$string['notokenincache']= "Refresh to see license information. Contact Poodll support if there is a problem.";


