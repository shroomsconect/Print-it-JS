const src_root_banner_img = './assets/images/slideshow/';
const time_slide_in_second = 5;

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
	let banner_paragraph = banner.querySelector( 'p' );

	let index_slide = 0;

	for( let dot_index = 0; dot_index < dot_list.length; dot_index++ )
	{
		if( dot_list[ dot_index ] != null )
		{
			let dot = dot_list[ dot_index ];

			if( dot.classList.contains( 'dot_selected' ) )
			{
				index_slide = dot_index;
				dot.classList.remove( 'dot_selected' );
			}
		}
	}

	if( arrow_element === 'left' || !auto && arrow_element.target.classList.contains( 'arrow_left' ) )
	{
		if( index_slide === 0 )
		{
			index_slide = slides.length-1;
		}
		else
		{
			index_slide--;
		}
	}
	else if( arrow_element === 'right' || !auto && arrow_element.target.classList.contains( 'arrow_right' ) )
	{
		if( index_slide === slides.length-1 )
		{
			index_slide = 0;
		}
		else
		{
			index_slide++;
		}
	}

	let src_img = src_root_banner_img + slides[ index_slide ].image;
	banner_img.setAttribute( 'src' ,src_img );

	banner_paragraph.innerHTML = slides[ index_slide ].tagLine;

	banner.querySelector( '.dots .dot:nth-child(' + ( index_slide+1 ) + ')' ).classList.add( 'dot_selected' );
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

	setInterval(
		() =>
		{
			slide_move( 'right' ,true );
		}
		,time_slide_in_second * 1000
	);
}

window.addEventListener( 'DOMContentLoaded' ,main );