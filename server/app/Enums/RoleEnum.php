<?php
namespace App\Enums;

enum Role: string 
{
    case SUPERADMIN = 'super_admin';
    case CASHIER = 'cashier';
    case MANAGEMENT = 'management';
}