<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class ProfilSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'Admin@genesacorp.com'],
            [
                'name' => 'Admin',
                'password' => bcrypt('Genesacorp12345'),
            ]
        );
    }
}
