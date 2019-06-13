using System.IO;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProAgil.API.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage="Campo requerido")]
        [StringLength (100, MinimumLength=3)]
        public string Local { get; set; }
        public string DataEvento { get; set; }
        [Required (ErrorMessage="O Tema deve ser preenchido")]
        public string Tema { get; set; }
        [Range(2,120000,ErrorMessage="Quantidade de pessoas é entre 2 e 120.000")]
        public int QtdPessoas { get; set; }
        public string Imageurl { get; set; }
        [Phone]
        public string Telefone { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public string Lote { get; set; }
        public List<LoteDto> Lotes { get; set; }
        public List<RedeSocialDto> RedesSociais { get; set; }
        public List<PalestranteDto> Palestrantes { get; set; }

    }
}