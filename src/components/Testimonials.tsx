import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  photo: string;
  comment: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Maria Silva",
    photo: "https://ui-avatars.com/api/?name=Maria+Silva&background=ec4899&color=fff",
    comment: "Consegui limpar meu nome em menos de 3 dias! Recomendo muito!",
    rating: 5,
  },
  {
    name: "João Santos",
    photo: "https://ui-avatars.com/api/?name=Joao+Santos&background=3b82f6&color=fff",
    comment: "Processo super rápido e fácil. Valeu muito a pena!",
    rating: 5,
  },
  {
    name: "Ana Costa",
    photo: "https://ui-avatars.com/api/?name=Ana+Costa&background=10b981&color=fff",
    comment: "Excelente atendimento e resultado rápido. Muito satisfeita!",
    rating: 4,
  },
  {
    name: "Pedro Oliveira",
    photo: "https://ui-avatars.com/api/?name=Pedro+Oliveira&background=f59e0b&color=fff",
    comment: "Voltei a ter crédito depois de anos. Serviço confiável!",
    rating: 5,
  },
];

export function Testimonials() {
  const averageRating = 4.9;
  const totalReviews = testimonials.length;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-foreground mb-2">
          O que nossos clientes dizem
        </h3>
        <div className="flex items-center justify-center gap-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="w-5 h-5 fill-warning text-warning"
              />
            ))}
          </div>
          <span className="text-lg font-bold text-foreground">
            {averageRating}
          </span>
          <span className="text-sm text-muted-foreground">
            ({totalReviews} avaliações)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-card rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <img
                src={testimonial.photo}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-foreground">
                    {testimonial.name}
                  </h4>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= testimonial.rating
                            ? "fill-warning text-warning"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {testimonial.comment}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
