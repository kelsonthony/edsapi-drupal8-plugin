(function ($, Drupal) {
    Drupal.behaviors.ebsco = {
    attach: function (context, settings) {
        $('input.myCustomBehavio', context).once('ebscoTest').each(function () {
        console.log('hello 8');
        });
    }
    };
})(jQuery, Drupal);



// (function ($, Drupal) {
//     Drupal.behaviors.ebsco = {
//         attach: function (context, settings) {
//           $('#lookfor', context).click(function () {
//             console.log('test');
//           });
//         }
//       };
// })(jQuery, Drupal);