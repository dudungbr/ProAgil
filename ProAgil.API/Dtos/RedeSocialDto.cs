using System.ComponentModel.DataAnnotations;

namespace ProAgil.API.Dtos
{
    public class RedeSocialDto
    {    
        public int id { get; set; }
        [Required(ErrorMessage="O campo {0} é obrigatório")]
        public string Nome { get; set; }
         [Required(ErrorMessage="O campo {0} é obrigatório")]
        public string Url { get; set; }

    }
}