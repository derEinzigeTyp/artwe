// draw iconic preview for jardine template

import flash.external.*;

Stage.scaleMode = "noScale";
Stage.align = "tl";

_root.ready = 'no';
 
_root.readyFunc = function(str:String) {
  return _root.ready;
}

ExternalInterface.addCallback("ready", _root, _root.readyFunc);

if( _root.numCols != null ) {
	var wid=parseInt( _root.numCols );
	var ht=parseInt( _root.numRows );
	var bgcolor = parseInt( _root.bodyBackgroundColor, 16)
	var cellColor = parseInt( _root.cellBackgroundColor, 16)
	var cellBorderColor = parseInt( _root.cellBorderColor, 16)
	var foregroundColor = parseInt( _root.foregroundColor, 16)
	var cellRolloverColor = parseInt( _root.cellRolloverColor, 16)
	var showLogo = _root.showLogo == 'true'
	updateDisplayWithParams( 
							wid, 
							ht, 
							bgcolor, 
							cellColor, 
							cellBorderColor,
							foregroundColor,
							cellRolloverColor,
							showLogo );
}
else {
	updateDisplayWithParams( 
							7, 
							4,
							0x5555FF,
							0x558855,
							0x555555, 
							0xFFDD00,
							0xFF8888,
							true
							)

}

function updateDisplayWithParams(
								 wid,
								 ht,
								 bgcolor,
								 cellColor,
								 cellBorderColor,
								 foregroundColor,
								 cellRolloverColor,
								 showLogo )
{

    _root.htmlIcon._y = Stage.height;
    _root.htmlIcon._x = 0;


	_root.beginFill( bgcolor, 100 );
	_root.moveTo( 0, 0 );
	_root.lineTo( Stage.width, 0 );
	_root.lineTo( Stage.width, Stage.height );
	_root.lineTo( 0, Stage.height );
	_root.lineTo( 0, 0 );
	_root.endFill();

	var gridInsetY = 45;
	var cellWidth = 35;
	var cellHeight = 35;
	var gridInsetX = ( Stage.width - cellWidth * wid ) / 2;
	if( gridInsetX < 15 )
		gridInsetX = 15;

	if( !showLogo ) {
		_root.idplate._x = Stage.width;
		gridInsetY = gridInsetY - _root.idplate._height;
	}
	else {
		_root.idplate._x = gridInsetX;
	}

	var needsRightSidePinking = false
	var needsBottomPinking = false

	var bottomChromeY
	var rightChromeX
	
	for( x = 0; x < wid; x++ ) {
		rightChromeX = gridInsetX + x*cellWidth
		if( rightChromeX <= Stage.width ) {
			for( y = 0; y < ht; y++ ) {
				bottomChromeY = gridInsetY + y*cellHeight
				
				if( bottomChromeY <= Stage.height ) {
					_root.lineStyle( 1, cellBorderColor )
					if( x == 0 and y == 0 )
						_root.beginFill( cellRolloverColor, 100 );
					else
						_root.beginFill( cellColor, 100 );

					_root.moveTo( gridInsetX + x*cellWidth, gridInsetY + y*cellHeight );
					_root.lineTo( gridInsetX + (x+1)*cellWidth, gridInsetY + y*cellHeight );
					_root.lineTo( gridInsetX + (x+1)*cellWidth, gridInsetY + (y+1)*cellHeight );
					_root.lineTo( gridInsetX + x*cellWidth, gridInsetY + (y+1)*cellHeight );
					_root.endFill();
				}
			}
		}
	}

	rightChromeX = rightChromeX + cellWidth
	if( rightChromeX > Stage.width ) {
		needsRightSidePinking = true
	}

	bottomChromeY = bottomChromeY + cellHeight + 5
	if( bottomChromeY > Stage.height ) {
		needsBottomPinking = true
	}

	var kPinking = 8
	if( needsRightSidePinking ) {
		_root.beginFill( 0x000000, 100 );
		_root.moveTo( Stage.width, Stage.height )
		for( y = 0; y <= Stage.height + kPinking; y+= kPinking*2 ) {
			_root.lineTo( Stage.width - kPinking, Stage.height - y )
			_root.lineTo( Stage.width, Stage.height - y - kPinking )
		}
		_root.lineTo( Stage.width, 0 )
		_root.endFill();
	}
	if( needsBottomPinking ) {
		_root.beginFill( 0x000000, 100 );
		_root.moveTo( Stage.width, Stage.height )
		for( x = 0; x <= Stage.width + kPinking; x+= kPinking*2 ) {
			_root.lineTo( Stage.width - x, Stage.height - kPinking )
			_root.lineTo( Stage.width - x - kPinking, Stage.height )
		}
		_root.lineTo( 0, Stage.height )
		_root.endFill();
	}

	var txt0 = _root.createTextField("my_txt0", 3, gridInsetX, gridInsetY - 23, 300, 100);
	txt0.multiline = true;
	txt0.wordWrap = false;
	var my_fmt0:TextFormat = new TextFormat();
	my_fmt0.color = foregroundColor;
	my_fmt0.underline = false;
	my_fmt0.size = 6;
	txt0.text = "Site Title";
	txt0.setTextFormat(my_fmt0);

	var txt = _root.createTextField("my_txt", 1, gridInsetX, gridInsetY - 10, 300, 100);
	txt.multiline = true;
	txt.wordWrap = false;
	var my_fmt:TextFormat = new TextFormat();
	my_fmt.color = foregroundColor;
	my_fmt.underline = false;
	my_fmt.size = 3;
	txt.text = "My Photographs Photographs\nThese are my photographs taken by me by me, they were taken by me o me";
	txt.setTextFormat(my_fmt);

	var txt2 = _root.createTextField("my_txt2", 2, gridInsetX, bottomChromeY, 300, 100);
	txt2.multiline = true;
	txt2.wordWrap = false;
	var my_fmt2:TextFormat = new TextFormat();
	my_fmt2.color = foregroundColor;
	my_fmt2.underline = false;
	my_fmt2.size = 5;
	txt2.text = "Contact Info";
	txt2.setTextFormat(my_fmt2);

	bottomChromeY = bottomChromeY + 10

}
