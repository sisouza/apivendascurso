import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductRepository from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

/* essa interface é como qnd a gtn vai passar obj pra funão
e precisa desestruturar la embaixo onde será recebida,

Os services tem um metodo apenas, esse medo vai receber uma instancia do nosso Repository
evitando interagirmos diretamente com ele, e esses metodos serao passados para o Controller
 */
class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const productExists = await productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('Product Name already exists');
    }

    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    await productsRepository.save(product);
    return product;
  }
}

export default CreateProductService;
