/*****************************************
*
* $Id: str_overview.js,v 1.0 2008/02/15 13:41:52 timo.trautmann Exp $
*
* File      :   $RCSfile: str_overview.js,v $
* Project   : Contenido
* Descr     : File contains functions for handling Content->Category forms and layers
*
* Author    :   $Author: timo.trautmann$
* Modified  :   $Date: 2008/02/15 13:41:52 $
*
* � four for business AG, www.4fb.de
******************************************/

//Defining vars for translations and contenido imagepath
var bMsie = (document.all) ? true : false;
var con_images = '';
var sMakeOnline = '';
var sMakeOffline = '';
var sProtectCategory = '';
var sUnprotectCategory = '';
var sFormError = '';
var sEmptyCatname = '';
var sEmptyCatSourcename = '';
var oldHrefTplcfg = '';

/**
 * Initialization of previous defined variables 
 * 
 * @param string sImagePath - HTML Path to contenido images
 * @param string sTransMakeOnline - Translation for setting category online
 * @param string sTransMakeOffline - Translation for setting category offline
 * @param string sTransProtectCategory - Translation for setting category protected
 * @param string sTransFormError - Errorheadline
 * @param string sTransEmptyCatname - Errorstring, if there is no catname
 * @param string sTransEmptyCatSourcename - Errorstring if there is no cat source name
 * 
 */
function initStrOverview(sImagePath, sTransMakeOnline, sTransMakeOffline, sTransProtectCategory, 
                          sTransUnprotectCategory, sTransFormError, sTransEmptyCatname, sTransEmptyCatSourcename) {
    con_images = sImagePath;
    sMakeOnline = sTransMakeOnline;
    sMakeOffline = sTransMakeOffline;
    sProtectCategory = sTransProtectCategory;
    sUnprotectCategory = sTransUnprotectCategory;
    sFormError = sTransFormError;
    sEmptyCatname = sTransEmptyCatname;
    sEmptyCatSourcename = sTransEmptyCatSourcename;
}

/**
 * Function handles inline Editing for displayed categories. It shows a corresponding Layer, which
 * allows to edit category options. In HTML there is only one tablerow for inline editing. It is always moved
 * to the needed position, before it is displayed
 * 
 * @param int iCatId - id of category, which should be edited
 * 
 */        
function handleInlineEdit(iCatId) {
    //Each form layer has the id syntax cat_<idcat>_layer
    iCatId = parseInt(iCatId);
    var layer = document.getElementById('cat_inline_layer');
    if (iCatId > 0) {   
        //Get References for editlayer, row to edit and category table content
        var row = document.getElementById('cat_'+iCatId+'_row'); 
        var table = document.getElementById('category_list').getElementsByTagName("tbody")[0];
        
        //If each html object exists
        if (layer && row && table) {
            var bResetted = false;
            //when layer is already open, first close it
            if (layer.style.display == 'block' || layer.style.display == 'table-row') {
                bResetted = true;
                layer.style.display = 'none';
                document.getElementById('cat_'+document.renamecategory.idcat.value+'_image').src= con_images+'but_todo.gif';
            }
            
            if (document.renamecategory.idcat.value != iCatId || bResetted == false) {
                //find previous tr element to use insertbefore function for edit layer
                while (row = row.nextSibling) {
                    if (row.nodeName == 'TR') {
                        break;
                    }
                }
             
                table.insertBefore(layer, row);
                
                if (bMsie) {
                    layer.style.display = 'block';
                } else {
                    layer.style.display = 'table-row';
                }
                document.getElementById('cat_'+iCatId+'_image').src= con_images+'but_todo_off.gif';
                
                //Get needed informations from dataArray and fill editform, also check perms
                document.renamecategory.idcat.value = iCatId;
                document.renamecategory.newcategoryalias.value = dataArray[iCatId]['alias']; 
                
                if(dataArray[iCatId]['pName'] == 1) {
                    document.getElementById('cat_name').style.display = 'inline';
                    document.renamecategory.newcategoryname.value = dataArray[iCatId]['catn']; 
                } else {
                    document.getElementById('cat_name').style.display = 'none';
                }
                
                if(dataArray[iCatId]['pTplcfg'] == 1) {
                    document.getElementById('tpl_cfg').style.display = 'inline';
                    if (oldHrefTplcfg == '') {
                        oldHrefTplcfg = document.getElementById('tplcfg_href').href;
                    }
                    document.getElementById('tplcfg_href').href = oldHrefTplcfg+'&idcat='+iCatId+'&idtpl='+dataArray[iCatId]['idtplcfg'];
                } else {
                    document.getElementById('tpl_cfg').style.display = 'none';
                    document.getElementById('tplcfg_href').href = oldHrefTplcfg;
                }
            }
        }
    } else {
        layer.style.display = 'none';
        document.getElementById('cat_'+document.renamecategory.idcat.value+'_image').src= con_images+'but_todo.gif';
    }
}

/**
 * Function shows Layer for generating a new Category
 * 
 */  
function showNewForm() { 
    //get Layer objects and get position of cat_navbar. On this basis, the layer is displayed.  We need a hidelayer to inactivate input elements.
    //this is important, when template Layer is displayed.
    var oHideEditLayer = document.getElementById('cat_new_layer_disable');
    var oHideEditLayerImage = document.getElementById('cat_new_layer_disable_image');
    var oEditLayer = document.getElementById('cat_edit');
    var pos = getElementPostion( document.getElementById('cat_navbar') );
    var select = document.getElementById('new_idcat');
    
    oEditLayer.style.left = pos[0]+10;
    oEditLayer.style.top = parseInt(pos[1])+parseInt(pos[2])-1;
    oEditLayer.style.visibility = 'hidden'; 
    oEditLayer.style.display = 'block';
    
    oHideEditLayer.style.visibility = 'hidden'; 
    oHideEditLayer.style.display = 'block';
    
    oHideEditLayer.style.left = pos[0]+10;
    oHideEditLayer.style.top = parseInt(pos[1])+parseInt(pos[2])-1;
    
    //get with of contained select element and calculate layer with.
    if (select) {
        var iWidth = 85+select.offsetWidth+15;

        if (iWidth > 477) {
            oEditLayer.style.width = iWidth+'px';
            oHideEditLayer.style.width = iWidth+'px';
        }
    }

    oHideEditLayer.style.height = oEditLayer.offsetHeight+'px';
    
    oHideEditLayerImage.height = oHideEditLayer.offsetHeight;
    oHideEditLayerImage.width = oHideEditLayer.offsetWidth; 

    oHideEditLayer.style.visibility = 'visible'; 
    oHideEditLayer.style.display = 'none';            
    
    refreshSelectedBaseCategory();
    
    oEditLayer.style.visibility = 'visible'; 
}

/**
 * Function gets currently selected categroy row an set it as default in select box for base category
 * (selectbox in category new layer) Function is also called by row instance 'str', when selected row
 * changes
 * 
 */
function refreshSelectedBaseCategory() {
    var select = document.getElementById('new_idcat');

    var iCatId = 0;
    if (str.markedRow) {
        if (str.markedRow.id.match(/^cat_(\d+)_row$/g)) {
            iCatId = parseInt(RegExp.$1);
        }
    }
    
    if (select && iCatId > 0) {
        var aOptions = select.getElementsByTagName('option');
        for (var i = 0; i < aOptions.length; i++) {
            aOptions[i].selected = false;
            if (!aOptions[i].disabled) {
                var iValueOption = parseInt(aOptions[i].value);
                if (iValueOption > 0 && iValueOption == iCatId) {
                    aOptions[i].selected = true;
                }
            }
        }
    }
}

/**
 * Function hides Layer for generating a new Category
 * 
 */ 
function hideNewForm() {
    //If Template layer is displayed, also hide
    hideTemplateSelect();

    var oEditLayer = document.getElementById('cat_edit');
    oEditLayer.style.display = 'none';
}

/**
* Function returns offset left, top, width and heigth of a given htnmlelement as array
*
* @param object oElement - Object which should be analyzed
* @return array - containing dimension information
*/
var getElementPostion = function (oElement) {
    var iHeigth = oElement.offsetHeight;
    var iWidth = oElement.offsetWidth;
    var iTop = 0, iLeft = 0;
    while (oElement) {
        iTop += oElement.offsetTop  || 0;
        iLeft += oElement.offsetLeft || 0;
        oElement = oElement.offsetParent;
    };
    return [iLeft, iTop, iHeigth, iWidth];
} 

/**
* Function toggles image and label for online status input, when user clicks on it
* function also sets status value in hidden input visible_input
*
*/
function changeVisible() {
    var image = document.getElementById('visible_image');
    var label = document.getElementById('visible_label');
    var input = document.getElementById('visible_input');
    
    if (input.value == '0') {
        label.innerHTML = sMakeOffline;
        image.src = con_images+'online.gif';
        image.alt = sMakeOffline;
        image.title = sMakeOffline;
        input.value = 1;
    } else {
        label.innerHTML = sMakeOnline;
        image.src = con_images+'offline.gif';
        image.alt = sMakeOnline;
        image.title = sMakeOnline;
        input.value = 0;
    }
}

/**
* Function toggles image and label for public status input, when user clicks on it
* function also sets status value in hidden input visible_input
*
*/  
function changePublic() {
    var image = document.getElementById('public_image');
    var label = document.getElementById('public_label');
    var input = document.getElementById('public_input');
    
    if (input.value == '1') {
        label.innerHTML = sUnprotectCategory;
        image.src = con_images+'folder_lock.gif';
        image.alt = sUnprotectCategory;
        image.title = sUnprotectCategory;
        input.value = 0;
    } else {
        label.innerHTML = sProtectCategory;
        image.src = con_images+'folder_delock.gif';
        image.alt = sProtectCategory;
        image.title = sProtectCategory;
        input.value = 1;
    }
}

/**
* Function is called when user changes target category or checks checkbox, that new category is a tree
* Corresponding to setted values, this function enables or disables form fields
*
*/    
function refreshStatus(bCaller) {
    var input = document.getElementById('new_idcat');                
    var checkbox = document.getElementById('is_tree');
    var conAction = document.getElementById('cat_new_action');
    //if user selects no target category, deactivate select and mark new category as tree
    if (bCaller == 1) {
        if (!input.value) {
           checkbox.checked = 'true';
           input.disabled  = true;
        }
    } else {
        //when category is tree, there is no need for target category select, else activate it
        if (checkbox.checked) {
            input.value = '';
            input.disabled  = true;
        } else {
            input.disabled  = false;
        }
    }
  
    //corresponding to checkbox state, set contenido action in form
    if (checkbox.checked) {
        conAction.value = 'str_newtree';
    } else {
        conAction.value = 'str_newcat';
    }
}

/**
* On submitting form, this function checks form values for mistakes
*
*/  
function checkForm() {
    var input = document.getElementById('new_idcat');                
    var checkbox = document.getElementById('is_tree');
    var category = document.getElementById('cat_categoryname').value;
    
    //Categoryname is a required field
    if (category == '') {
        box.notify(sFormError, sEmptyCatname);
        return false;
    }
    
    //if Category is no tree, a target category must be selected
    if (!checkbox.checked && input.value == '') {
        box.notify(sFormError, sEmptyCatSourcename);
        return false;
    }                
}

/**
* On creating a new category this function enables a sencod layer, which allows to select a templat for this new category.
* In this step it is not possible to configure template. It is only allowed to selet a template.
* This function also disables serveral inputs in the new category layer and switches submitbuttons to grey
*
*/   
function showTemplateSelect() {
    document.getElementById('cat_new_layer_disable').style.display = 'block';
    document.getElementById('new_idcat').disabled = true;  
  
    var oCategoryLayer = document.getElementById('cat_set_template_layer');
    var pos = getElementPostion( document.getElementById('cat_category_select_button') );
    
    document.getElementById('cat_new_submit').disabled = true;
    document.getElementById('cat_new_submit').src = con_images+'but_ok_off.gif';
    document.getElementById('cat_new_cancel').src = con_images+'but_cancel_off.gif';
    
    var select = document.getElementById('cat_template_select');
    
    oCategoryLayer.style.left = pos[0]+22;
    oCategoryLayer.style.top = parseInt(pos[1])+parseInt(pos[2])-50;
    oCategoryLayer.style.visibility = 'hidden'; 
    
    oCategoryLayer.style.display = 'block';

    //get with of contained select element and calculate layer with.
    if (select) {
        var iWidth = 95+select.offsetWidth+15;

        if (iWidth > 252) {
            oCategoryLayer.style.width = iWidth+'px';
        }
    }
    
    oCategoryLayer.style.visibility = 'visible'; 
}

/**
* This function hides template layer an activates inputs in the new category layer which were disabled by
* showTemplateSelect();
*
*/   
function hideTemplateSelect(bSave) {
    document.getElementById('cat_new_layer_disable').style.display = 'none';
    if (!document.getElementById('is_tree').checked) {
        document.getElementById('new_idcat').disabled = false; 
    }
  
    var oCategoryLayer = document.getElementById('cat_set_template_layer');
    oCategoryLayer.style.display = 'none';
    
    document.getElementById('cat_new_submit').disabled = false;
    document.getElementById('cat_new_submit').src = con_images+'but_ok.gif';
    document.getElementById('cat_new_cancel').src = con_images+'but_cancel.gif';
    
    if (bSave) {
        document.getElementById('idtplcfg_input').value = document.getElementById('cat_template_select').value;
        
    }
}