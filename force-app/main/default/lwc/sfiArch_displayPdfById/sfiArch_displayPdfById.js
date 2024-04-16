/**
 * Omniscript Display of PDF
 *  
 * Pass in a ContentVersionId of the attached Salesforce File to generate the URL used in the iFrame display in the HTML
 * 
 * 
 * @author Dean Fischesser <dfischesser@salesforce.com>
 * 
 * History
 * =======
 * 1.0 - August, 2021 - Initial Version
 * 
 * 
 **/

 import {LightningElement,track,api} from 'lwc';
 import {OmniscriptBaseMixin} from 'vlocity_ins/omniscriptBaseMixin';

 export default class SfiArch_displayPdfById extends OmniscriptBaseMixin(LightningElement) {

            @api myfileid;

            get url() {
                return '/sfc/servlet.shepherd/version/download/' + this.myfileid;
            }

 }