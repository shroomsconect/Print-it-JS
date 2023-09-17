const _src_root_banner_img = './assets/images/slideshow/';
const _time_slide_in_second = 5;

let _index_slide = 0;

let SLIDE_ON_COURSE = false;

const slides =
[
	{
		"image":"slide1.jpg",
		"tagLine":"Impressions tous formats <span>en boutique et en ligne</span>"
	},
	{
		"image":"slide2.jpg",
		"tagLine":"Tirages haute définition grand format <span>pour vos bureaux et events</span>"
	},
	{
		"image":"slide3.jpg",
		"tagLine":"Grand choix de couleurs <span>de CMJN aux pantones</span>"
	},
	{
		"image":"slide4.png",
		"tagLine":"Autocollants <span>avec découpe laser sur mesure</span>"
	}
]


function slide_move( arrow_element ,auto = false )
{
	let banner = document.getElementById( 'banner' );
	let banner_img = banner.querySelector( '.banner-img' );
	let dot_list = banner.querySelectorAll( '.dots .dot' );

	for( let dot_index = 0; dot_index < dot_list.length; dot_index++ )
	{
		if( dot_list[ dot_index ] != null )
		{
			let dot = dot_list[ dot_index ];

			if( dot.classList.contains( 'dot_selected' ) )
			{
				_index_slide = dot_index;
				dot.classList.remove( 'dot_selected' );
			}
		}
	}

	if( arrow_element === 'left' || !auto && arrow_element.target.classList.contains( 'arrow_left' ) )
	{
		if( _index_slide === 0 )
		{
			_index_slide = slides.length-1;
		}
		else
		{
			_index_slide--;
		}
	}
	else if( arrow_element === 'right' || !auto && arrow_element.target.classList.contains( 'arrow_right' ) )
	{
		if( _index_slide === slides.length-1 )
		{
			_index_slide = 0;
		}
		else
		{
			_index_slide++;
		}
	}

	let src_img = _src_root_banner_img + slides[ _index_slide ].image;
	banner_img.setAttribute( 'src' ,src_img );
}


function change_data_slide()
{
	let banner = document.getElementById( 'banner' );
	let banner_paragraph = banner.querySelector( 'p' );

	banner_paragraph.innerHTML = slides[ _index_slide ].tagLine;

	banner.querySelector( '.dots .dot:nth-child(' + ( _index_slide+1 ) + ')' ).classList.add( 'dot_selected' );
}


function create_dots_slide()
{
	let dots_container = document.querySelector( '#banner .dots' );

	for( let i = 0; i < slides.length; i++ )
	{
		let dot_element = document.createElement( 'div' );

		dot_element.classList.add( 'dot' );

		if( i === 0 )
		{
			dot_element.classList.add( 'dot_selected' );
		}

		dots_container.appendChild( dot_element );
	}
}

let main = function()
{
	create_dots_slide();

	let arrow_slide_list = document.querySelectorAll( '#banner .arrow' ,slide_move );

	for( const arrow_slide of arrow_slide_list )
	{
		arrow_slide.addEventListener( 'click' ,slide_move );
	}

	let banner_img = document.querySelector( '#banner .banner-img' );
	banner_img.addEventListener(
		'load' 
		,() =>
		{
			console.log('on');
			change_data_slide();

			if( !SLIDE_ON_COURSE )
			{
				SLIDE_ON_COURSE = true;
				setTimeout(
					() =>
					{
						slide_move( 'right' ,true );
						SLIDE_ON_COURSE = false;
					}
					,_time_slide_in_second * 1000
				);
			}
		}
	);

	setTimeout(
		() =>
		{
			slide_move( 'right' ,true );
		}
		,_time_slide_in_second * 1000
	);
}

window.addEventListener( 'DOMContentLoaded' ,main );