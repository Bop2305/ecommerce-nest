import { Type } from 'class-transformer';
import { IsEnum, IsOptional, Max, Min } from 'class-validator';
import { EnumOrder } from 'src/enums/order.enum';

export class PaginationParams {
    @IsEnum(EnumOrder)
    @IsOptional()
    order?: EnumOrder = EnumOrder.ASC

    @Type(() => Number)
    @IsOptional()
    @Min(1)
    page?: number = 1

    @Type(() => Number)
    @IsOptional()
    @Min(1)
    @Max(50)
    perpage?: number = 20
}